-- Create Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  nin_bvn VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  profile_photo_url VARCHAR(500),
  id_photo_url VARCHAR(500),
  kyc_status VARCHAR(50) DEFAULT 'pending', -- pending, verified, rejected
  account_status VARCHAR(50) DEFAULT 'active', -- active, suspended, banned
  total_savings DECIMAL(15,2) DEFAULT 0,
  total_credits_accessed DECIMAL(15,2) DEFAULT 0,
  credit_score INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Groups/Esusu Table
CREATE TABLE esusu_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cycle_duration_weeks INT NOT NULL,
  contribution_amount DECIMAL(15,2) NOT NULL,
  contribution_frequency VARCHAR(50) NOT NULL, -- daily, weekly, monthly
  max_members INT DEFAULT 20,
  current_members INT DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active', -- active, paused, completed, cancelled
  total_contributions DECIMAL(15,2) DEFAULT 0,
  payout_order TEXT, -- JSON array of member IDs for payout sequence
  guarantee_reserve DECIMAL(15,2) DEFAULT 0,
  cycle_start_date DATE,
  cycle_end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Group Memberships
CREATE TABLE group_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES esusu_groups(id) ON DELETE CASCADE,
  join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, left, removed
  total_contributed DECIMAL(15,2) DEFAULT 0,
  missed_contributions INT DEFAULT 0,
  payout_received BOOLEAN DEFAULT FALSE,
  payout_date TIMESTAMP,
  payout_amount DECIMAL(15,2),
  UNIQUE(user_id, group_id)
);

-- Contributions Table
CREATE TABLE contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES esusu_groups(id) ON DELETE CASCADE,
  amount DECIMAL(15,2) NOT NULL,
  contribution_date DATE NOT NULL,
  payment_method VARCHAR(50), -- bank_transfer, wallet, card
  transaction_reference VARCHAR(255),
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  automated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Credit Passport (Credit Score Record)
CREATE TABLE credit_passport (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  total_cycles_participated INT DEFAULT 0,
  total_contributions DECIMAL(15,2) DEFAULT 0,
  on_time_contributions INT DEFAULT 0,
  missed_contributions INT DEFAULT 0,
  default_count INT DEFAULT 0,
  current_credit_score INT DEFAULT 0,
  max_credit_limit DECIMAL(15,2) DEFAULT 0,
  credits_accessed DECIMAL(15,2) DEFAULT 0,
  credits_repaid DECIMAL(15,2) DEFAULT 0,
  average_payback_days INT DEFAULT 0,
  risk_rating VARCHAR(50), -- low, medium, high
  last_score_updated TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Credit Access & Loans
CREATE TABLE credit_lines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  credit_limit DECIMAL(15,2) NOT NULL,
  available_credit DECIMAL(15,2) NOT NULL,
  interest_rate DECIMAL(5,2), -- percentage
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, closed
  last_access_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loan/Credit Transactions
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  credit_line_id UUID REFERENCES credit_lines(id) ON DELETE SET NULL,
  amount BORROWED DECIMAL(15,2) NOT NULL,
  interest_accrued DECIMAL(15,2) DEFAULT 0,
  total_repayment DECIMAL(15,2) NOT NULL,
  disbursement_date TIMESTAMP NOT NULL,
  due_date TIMESTAMP NOT NULL,
  repayment_date TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active', -- active, repaid, defaulted, overdue
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payout Roster
CREATE TABLE payout_roster (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES esusu_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cycle_number INT NOT NULL,
  payout_position INT NOT NULL,
  expected_payout_date DATE,
  actual_payout_date TIMESTAMP,
  payout_amount DECIMAL(15,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, cancelled
  payment_reference VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(group_id, cycle_number, user_id)
);

-- Bank Accounts / Payment Methods
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bank_account_number VARCHAR(20),
  bank_code VARCHAR(10),
  account_name VARCHAR(100),
  wallet_provider VARCHAR(50), -- Paystack, Flutterwave, etc.
  wallet_id VARCHAR(255),
  is_primary BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Guarantee Reserve (Security Fund)
CREATE TABLE guarantee_reserve (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL UNIQUE REFERENCES esusu_groups(id) ON DELETE CASCADE,
  reserve_amount DECIMAL(15,2) DEFAULT 0,
  coverage_percentage INT DEFAULT 100, -- 100 means 100% savings security
  last_reserve_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Automated Contributions Schedule
CREATE TABLE automated_contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES esusu_groups(id) ON DELETE CASCADE,
  payment_method_id UUID REFERENCES payment_methods(id) ON DELETE SET NULL,
  contribution_amount DECIMAL(15,2) NOT NULL,
  frequency VARCHAR(50) NOT NULL, -- daily, weekly, monthly
  next_deduction_date DATE,
  last_deduction_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Log (Audit Trail)
CREATE TABLE transaction_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  transaction_type VARCHAR(50), -- contribution, payout, credit_access, repayment, fee
  amount DECIMAL(15,2),
  description TEXT,
  status VARCHAR(50),
  reference_id VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Disputes & Support
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES esusu_groups(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'open', -- open, in_review, resolved, closed
  dispute_type VARCHAR(50),
  resolution TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_nin_bvn ON users(nin_bvn);
CREATE INDEX idx_group_memberships_user ON group_memberships(user_id);
CREATE INDEX idx_group_memberships_group ON group_memberships(group_id);
CREATE INDEX idx_contributions_user ON contributions(user_id);
CREATE INDEX idx_contributions_group ON contributions(group_id);
CREATE INDEX idx_contributions_date ON contributions(contribution_date);
CREATE INDEX idx_credit_transactions_user ON credit_transactions(user_id);
CREATE INDEX idx_payout_roster_group ON payout_roster(group_id);
CREATE INDEX idx_payout_roster_user ON payout_roster(user_id);
CREATE INDEX idx_transaction_log_user ON transaction_log(user_id);
CREATE INDEX idx_transaction_log_date ON transaction_log(created_at);

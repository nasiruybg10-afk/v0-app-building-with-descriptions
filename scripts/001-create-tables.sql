-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'school_owner', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Schools table
CREATE TABLE IF NOT EXISTS schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  country VARCHAR(100) DEFAULT 'Nigeria',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(255),
  established_year INTEGER,
  student_count INTEGER DEFAULT 0,
  teacher_count INTEGER DEFAULT 0,
  type VARCHAR(50) CHECK (type IN ('primary', 'secondary', 'tertiary', 'islamic_center')),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  owner_id INTEGER REFERENCES users(id),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- School reviews table
CREATE TABLE IF NOT EXISTS school_reviews (
  id SERIAL PRIMARY KEY,
  school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50) CHECK (event_type IN ('conference', 'workshop', 'competition', 'fundraiser', 'other')),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  location TEXT,
  city VARCHAR(100),
  organizer VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  registration_url TEXT,
  image_url TEXT,
  status VARCHAR(50) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  status VARCHAR(50) DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- KYS applications table
CREATE TABLE IF NOT EXISTS kys_applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  school_id INTEGER REFERENCES schools(id),
  applicant_name VARCHAR(255) NOT NULL,
  applicant_email VARCHAR(255) NOT NULL,
  applicant_phone VARCHAR(50) NOT NULL,
  school_name VARCHAR(255) NOT NULL,
  school_address TEXT NOT NULL,
  principal_name VARCHAR(255),
  student_count INTEGER,
  teacher_count INTEGER,
  facilities TEXT,
  curriculum TEXT,
  documents JSONB,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  admin_notes TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by INTEGER REFERENCES users(id)
);

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id SERIAL PRIMARY KEY,
  donor_name VARCHAR(255) NOT NULL,
  donor_email VARCHAR(255) NOT NULL,
  donor_phone VARCHAR(50),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'NGN',
  donation_type VARCHAR(50) CHECK (donation_type IN ('one_time', 'monthly', 'zakat')),
  school_id INTEGER REFERENCES schools(id),
  payment_method VARCHAR(50),
  payment_reference VARCHAR(255) UNIQUE,
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  is_anonymous BOOLEAN DEFAULT FALSE,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Zakat calculations table
CREATE TABLE IF NOT EXISTS zakat_calculations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  cash_in_hand DECIMAL(12, 2) DEFAULT 0,
  bank_balance DECIMAL(12, 2) DEFAULT 0,
  gold_value DECIMAL(12, 2) DEFAULT 0,
  silver_value DECIMAL(12, 2) DEFAULT 0,
  investments DECIMAL(12, 2) DEFAULT 0,
  business_assets DECIMAL(12, 2) DEFAULT 0,
  rental_income DECIMAL(12, 2) DEFAULT 0,
  other_assets DECIMAL(12, 2) DEFAULT 0,
  total_assets DECIMAL(12, 2) NOT NULL,
  liabilities DECIMAL(12, 2) DEFAULT 0,
  zakatable_amount DECIMAL(12, 2) NOT NULL,
  zakat_due DECIMAL(12, 2) NOT NULL,
  calculation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Boards (community discussions) table
CREATE TABLE IF NOT EXISTS boards (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100),
  author_id INTEGER REFERENCES users(id),
  author_name VARCHAR(255) NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Board comments table
CREATE TABLE IF NOT EXISTS board_comments (
  id SERIAL PRIMARY KEY,
  board_id INTEGER REFERENCES boards(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  author_name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_schools_status ON schools(status);
CREATE INDEX IF NOT EXISTS idx_schools_city ON schools(city);
CREATE INDEX IF NOT EXISTS idx_schools_type ON schools(type);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_kys_status ON kys_applications(status);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(payment_status);
CREATE INDEX IF NOT EXISTS idx_boards_status ON boards(status);

-- AL-MURATTAL GLOBAL NETWORK Database Schema
-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS board_comments CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS zakat_calculations CASCADE;
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS kys_applications CASCADE;
DROP TABLE IF EXISTS event_registrations CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS school_reviews CASCADE;
DROP TABLE IF EXISTS schools CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT users_role_check CHECK (role IN ('user', 'school_owner', 'admin'))
);

-- Schools table
CREATE TABLE schools (
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
  type VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  owner_id INTEGER,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT schools_type_check CHECK (type IN ('primary', 'secondary', 'tertiary', 'islamic_center')),
  CONSTRAINT schools_status_check CHECK (status IN ('pending', 'approved', 'rejected')),
  CONSTRAINT schools_owner_fk FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- School reviews table
CREATE TABLE school_reviews (
  id SERIAL PRIMARY KEY,
  school_id INTEGER NOT NULL,
  user_id INTEGER,
  rating INTEGER,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT reviews_rating_check CHECK (rating >= 1 AND rating <= 5),
  CONSTRAINT reviews_school_fk FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE,
  CONSTRAINT reviews_user_fk FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  location TEXT,
  city VARCHAR(100),
  organizer VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  registration_url TEXT,
  image_url TEXT,
  status VARCHAR(50) DEFAULT 'upcoming',
  created_by INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT events_type_check CHECK (event_type IN ('conference', 'workshop', 'competition', 'fundraiser', 'other')),
  CONSTRAINT events_status_check CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  CONSTRAINT events_creator_fk FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Event registrations table
CREATE TABLE event_registrations (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL,
  user_id INTEGER,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  status VARCHAR(50) DEFAULT 'registered',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT registrations_status_check CHECK (status IN ('registered', 'attended', 'cancelled')),
  CONSTRAINT registrations_event_fk FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  CONSTRAINT registrations_user_fk FOREIGN KEY (user_id) REFERENCES users(id)
);

-- KYS applications table
CREATE TABLE kys_applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  school_id INTEGER,
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
  status VARCHAR(50) DEFAULT 'pending',
  admin_notes TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by INTEGER,
  CONSTRAINT kys_status_check CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  CONSTRAINT kys_user_fk FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT kys_school_fk FOREIGN KEY (school_id) REFERENCES schools(id),
  CONSTRAINT kys_reviewer_fk FOREIGN KEY (reviewed_by) REFERENCES users(id)
);

-- Donations table
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  donor_name VARCHAR(255) NOT NULL,
  donor_email VARCHAR(255) NOT NULL,
  donor_phone VARCHAR(50),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'NGN',
  donation_type VARCHAR(50),
  school_id INTEGER,
  payment_method VARCHAR(50),
  payment_reference VARCHAR(255) UNIQUE,
  payment_status VARCHAR(50) DEFAULT 'pending',
  is_anonymous BOOLEAN DEFAULT FALSE,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  CONSTRAINT donations_type_check CHECK (donation_type IN ('one_time', 'monthly', 'zakat')),
  CONSTRAINT donations_status_check CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  CONSTRAINT donations_school_fk FOREIGN KEY (school_id) REFERENCES schools(id)
);

-- Zakat calculations table
CREATE TABLE zakat_calculations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
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
  calculation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT zakat_user_fk FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Boards (community discussions) table
CREATE TABLE boards (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100),
  author_id INTEGER,
  author_name VARCHAR(255) NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT boards_status_check CHECK (status IN ('active', 'archived', 'deleted')),
  CONSTRAINT boards_author_fk FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Board comments table
CREATE TABLE board_comments (
  id SERIAL PRIMARY KEY,
  board_id INTEGER NOT NULL,
  user_id INTEGER,
  author_name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT comments_board_fk FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE,
  CONSTRAINT comments_user_fk FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes for better query performance
CREATE INDEX idx_schools_status ON schools(status);
CREATE INDEX idx_schools_city ON schools(city);
CREATE INDEX idx_schools_type ON schools(type);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_kys_status ON kys_applications(status);
CREATE INDEX idx_donations_status ON donations(payment_status);
CREATE INDEX idx_boards_status ON boards(status);

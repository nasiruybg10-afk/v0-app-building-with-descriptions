-- AL-MURATTAL NETWORK Database Schema
-- This script creates the complete database structure for the platform

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
('GLOBAL_ADMIN', 'Global headquarters administrator'),
('COUNTRY_ADMIN', 'Country-level administrator'),
('STATE_ADMIN', 'State-level administrator'),
('LGA_ADMIN', 'Local Government Area administrator'),
('SCHOOL_ADMIN', 'School administrator'),
('MODERATOR', 'Content moderator'),
('VERIFIED_INDIVIDUAL', 'Verified individual user'),
('USER', 'Regular user')
ON CONFLICT (name) DO NOTHING;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role_id INTEGER REFERENCES roles(id),
    verified BOOLEAN DEFAULT FALSE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    iso_code VARCHAR(3) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    approved_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create states table
CREATE TABLE IF NOT EXISTS states (
    id SERIAL PRIMARY KEY,
    country_id INTEGER REFERENCES countries(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    approved_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create lgas table (Local Government Areas)
CREATE TABLE IF NOT EXISTS lgas (
    id SERIAL PRIMARY KEY,
    state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    approved_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create organizations table (schools, mosques, NGOs)
CREATE TABLE IF NOT EXISTS organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'school', 'mosque', 'ngo'
    country_id INTEGER REFERENCES countries(id),
    state_id INTEGER REFERENCES states(id),
    lga_id INTEGER REFERENCES lgas(id),
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    website VARCHAR(255),
    description TEXT,
    curriculum_summary TEXT,
    facilities JSONB,
    created_by INTEGER REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'DRAFT',
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create KYS submissions table
CREATE TABLE IF NOT EXISTS kys_submissions (
    id SERIAL PRIMARY KEY,
    org_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    submitted_by INTEGER REFERENCES users(id),
    payload JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'SUBMITTED',
    reviewer_notes TEXT,
    reviewed_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    org_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'walimah', 'musabaqah', 'maulud', 'graduation', 'seminar'
    description TEXT,
    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NOT NULL,
    venue VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    capacity INTEGER,
    ticket_price DECIMAL(10, 2) DEFAULT 0,
    livestream_url VARCHAR(255),
    contact_info TEXT,
    status VARCHAR(50) DEFAULT 'PENDING',
    approved_by INTEGER REFERENCES users(id),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create event attendees table
CREATE TABLE IF NOT EXISTS event_attendees (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'REGISTERED', -- 'registered', 'attended', 'cancelled'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, user_id)
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    donor_id INTEGER REFERENCES users(id),
    org_id INTEGER REFERENCES organizations(id),
    event_id INTEGER REFERENCES events(id),
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    provider VARCHAR(50) NOT NULL, -- 'paystack', 'stripe', 'crypto'
    provider_tx_id VARCHAR(255),
    platform_fee DECIMAL(12, 2) NOT NULL,
    net_amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    is_zakat BOOLEAN DEFAULT FALSE,
    donor_email VARCHAR(255),
    donor_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
    id SERIAL PRIMARY KEY,
    owner_type VARCHAR(50) NOT NULL, -- 'HQ', 'ORG', 'CAMPAIGN'
    owner_id INTEGER NOT NULL,
    balance DECIMAL(12, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(owner_type, owner_id, currency)
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
    id SERIAL PRIMARY KEY,
    owner_type VARCHAR(50) NOT NULL, -- 'ORG', 'EVENT', 'BOARD'
    owner_id INTEGER NOT NULL,
    url VARCHAR(500) NOT NULL,
    mime_type VARCHAR(100),
    caption TEXT,
    file_size INTEGER,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create boards/announcements table
CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    owner_type VARCHAR(50) NOT NULL, -- 'HQ', 'COUNTRY', 'STATE', 'LGA', 'ORG'
    owner_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    attachments JSONB,
    pinned BOOLEAN DEFAULT FALSE,
    scheduled_at TIMESTAMP,
    published_at TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    org_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    schedule VARCHAR(255),
    fees DECIMAL(10, 2),
    contact_info TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create audit logs table
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    actor_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    target_type VARCHAR(50) NOT NULL,
    target_id INTEGER NOT NULL,
    data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    payload JSONB,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_organizations_location ON organizations USING GIST (ST_Point(longitude, latitude));
CREATE INDEX IF NOT EXISTS idx_organizations_status ON organizations(status);
CREATE INDEX IF NOT EXISTS idx_events_start_at ON events(start_at);
CREATE INDEX IF NOT EXISTS idx_events_org_id ON events(org_id);
CREATE INDEX IF NOT EXISTS idx_donations_org_id ON donations(org_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_announcements_owner ON announcements(owner_type, owner_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_target ON audit_logs(target_type, target_id);

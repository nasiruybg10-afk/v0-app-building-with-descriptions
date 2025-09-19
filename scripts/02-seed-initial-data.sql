-- Seed initial data for AL-MURATTAL NETWORK

-- Insert Nigeria as the first country
INSERT INTO countries (name, iso_code, status, approved_by) VALUES
('Nigeria', 'NGA', 'ACTIVATED', 1)
ON CONFLICT (iso_code) DO NOTHING;

-- Insert Gombe State
INSERT INTO states (country_id, name, status, approved_by) VALUES
(1, 'Gombe State', 'ACTIVATED', 1)
ON CONFLICT DO NOTHING;

-- Insert example LGA
INSERT INTO lgas (state_id, name, status, approved_by) VALUES
(1, 'Gombe', 'ACTIVATED', 1)
ON CONFLICT DO NOTHING;

-- Create AL-MURATTAL Institute as Global HQ
INSERT INTO organizations (
    name, 
    type, 
    country_id, 
    state_id, 
    lga_id, 
    address, 
    latitude, 
    longitude, 
    contact_email, 
    contact_phone, 
    description,
    status,
    verified_at,
    created_by
) VALUES (
    'AL-MURATTAL Institute (Global HQ)',
    'school',
    1,
    1,
    1,
    'M07 Western Transformer Line, Bomala Quarters, Gombe State, Nigeria',
    10.2897,
    11.1678,
    'almurattalinstitute@gmail.com',
    '+2348034585973',
    'Global headquarters for AL-MURATTAL NETWORK - A premier Islamic educational institution.',
    'ACTIVATED',
    CURRENT_TIMESTAMP,
    1
) ON CONFLICT DO NOTHING;

-- Create Global Admin user
INSERT INTO users (email, name, phone, role_id, verified, email_verified) VALUES
('admin@almurattal.org', 'Global Administrator', '+2348034585973', 1, TRUE, TRUE)
ON CONFLICT (email) DO NOTHING;

-- Create HQ wallet
INSERT INTO wallets (owner_type, owner_id, balance, currency) VALUES
('HQ', 1, 0.00, 'USD'),
('HQ', 1, 0.00, 'NGN')
ON CONFLICT (owner_type, owner_id, currency) DO NOTHING;

-- Create sample verified school
INSERT INTO organizations (
    name, 
    type, 
    country_id, 
    state_id, 
    lga_id, 
    address, 
    latitude, 
    longitude, 
    contact_email, 
    contact_phone, 
    description,
    curriculum_summary,
    status,
    verified_at,
    created_by
) VALUES (
    'Madrasa Al-Noor',
    'school',
    1,
    1,
    1,
    'Central Market Area, Gombe, Nigeria',
    10.2897,
    11.1678,
    'info@madrasaalnoor.org',
    '+2348012345678',
    'A community-focused Islamic school offering comprehensive Quranic education.',
    'Tahfiz, Tajweed, Arabic Language, Islamic Studies',
    'ACTIVATED',
    CURRENT_TIMESTAMP,
    1
) ON CONFLICT DO NOTHING;

-- Create sample event
INSERT INTO events (
    org_id,
    title,
    type,
    description,
    start_at,
    end_at,
    venue,
    capacity,
    status,
    created_by
) VALUES (
    2,
    'Annual Quran Recitation Competition',
    'musabaqah',
    'Join us for our annual Quran recitation competition featuring students from across the region.',
    CURRENT_TIMESTAMP + INTERVAL '30 days',
    CURRENT_TIMESTAMP + INTERVAL '30 days' + INTERVAL '4 hours',
    'Madrasa Al-Noor Main Hall',
    200,
    'APPROVED',
    1
) ON CONFLICT DO NOTHING;

-- Create sample donation
INSERT INTO donations (
    donor_id,
    org_id,
    amount,
    currency,
    provider,
    provider_tx_id,
    platform_fee,
    net_amount,
    status,
    donor_email,
    donor_name
) VALUES (
    1,
    2,
    100.00,
    'USD',
    'stripe',
    'tx_sample123',
    5.00,
    95.00,
    'COMPLETED',
    'donor@example.com',
    'Sample Donor'
) ON CONFLICT DO NOTHING;

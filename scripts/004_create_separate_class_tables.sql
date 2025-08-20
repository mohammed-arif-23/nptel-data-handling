-- Drop existing tables if they exist
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS class_a_students;
DROP TABLE IF EXISTS class_b_students;

-- Create separate tables for II-IT and III-IT students
CREATE TABLE ii_it_students (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    register_number TEXT UNIQUE NOT NULL,
    mobile TEXT NOT NULL,
    nptel_course_name TEXT NOT NULL,
    nptel_course_id TEXT NOT NULL,
    course_duration INTEGER NOT NULL DEFAULT 12,
    week_1 TEXT DEFAULT 'not_started' CHECK (week_1 IN ('not_started', 'in_progress', 'completed')),
    week_2 TEXT DEFAULT 'not_started' CHECK (week_2 IN ('not_started', 'in_progress', 'completed')),
    week_3 TEXT DEFAULT 'not_started' CHECK (week_3 IN ('not_started', 'in_progress', 'completed')),
    week_4 TEXT DEFAULT 'not_started' CHECK (week_4 IN ('not_started', 'in_progress', 'completed')),
    week_5 TEXT DEFAULT 'not_started' CHECK (week_5 IN ('not_started', 'in_progress', 'completed')),
    week_6 TEXT DEFAULT 'not_started' CHECK (week_6 IN ('not_started', 'in_progress', 'completed')),
    week_7 TEXT DEFAULT 'not_started' CHECK (week_7 IN ('not_started', 'in_progress', 'completed')),
    week_8 TEXT DEFAULT 'not_started' CHECK (week_8 IN ('not_started', 'in_progress', 'completed')),
    week_9 TEXT DEFAULT 'not_started' CHECK (week_9 IN ('not_started', 'in_progress', 'completed')),
    week_10 TEXT DEFAULT 'not_started' CHECK (week_10 IN ('not_started', 'in_progress', 'completed')),
    week_11 TEXT DEFAULT 'not_started' CHECK (week_11 IN ('not_started', 'in_progress', 'completed')),
    week_12 TEXT DEFAULT 'not_started' CHECK (week_12 IN ('not_started', 'in_progress', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE iii_it_students (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    register_number TEXT UNIQUE NOT NULL,
    mobile TEXT NOT NULL,
    nptel_course_name TEXT NOT NULL,
    nptel_course_id TEXT NOT NULL,
    course_duration INTEGER NOT NULL DEFAULT 12,
    week_1 TEXT DEFAULT 'not_started' CHECK (week_1 IN ('not_started', 'in_progress', 'completed')),
    week_2 TEXT DEFAULT 'not_started' CHECK (week_2 IN ('not_started', 'in_progress', 'completed')),
    week_3 TEXT DEFAULT 'not_started' CHECK (week_3 IN ('not_started', 'in_progress', 'completed')),
    week_4 TEXT DEFAULT 'not_started' CHECK (week_4 IN ('not_started', 'in_progress', 'completed')),
    week_5 TEXT DEFAULT 'not_started' CHECK (week_5 IN ('not_started', 'in_progress', 'completed')),
    week_6 TEXT DEFAULT 'not_started' CHECK (week_6 IN ('not_started', 'in_progress', 'completed')),
    week_7 TEXT DEFAULT 'not_started' CHECK (week_7 IN ('not_started', 'in_progress', 'completed')),
    week_8 TEXT DEFAULT 'not_started' CHECK (week_8 IN ('not_started', 'in_progress', 'completed')),
    week_9 TEXT DEFAULT 'not_started' CHECK (week_9 IN ('not_started', 'in_progress', 'completed')),
    week_10 TEXT DEFAULT 'not_started' CHECK (week_10 IN ('not_started', 'in_progress', 'completed')),
    week_11 TEXT DEFAULT 'not_started' CHECK (week_11 IN ('not_started', 'in_progress', 'completed')),
    week_12 TEXT DEFAULT 'not_started' CHECK (week_12 IN ('not_started', 'in_progress', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE ii_it_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE iii_it_students ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (since we're not using auth)
CREATE POLICY "Allow all operations on ii_it_students" ON ii_it_students FOR ALL USING (true);
CREATE POLICY "Allow all operations on iii_it_students" ON iii_it_students FOR ALL USING (true);

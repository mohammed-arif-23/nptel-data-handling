-- Drop existing tables and create a simple students table
DROP TABLE IF EXISTS class_a_students;
DROP TABLE IF EXISTS class_b_students;

-- Create a single simple students table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  register_number TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  class_name TEXT NOT NULL CHECK (class_name IN ('II-IT', 'III-IT')),
  nptel_course_name TEXT NOT NULL,
  nptel_course_id TEXT NOT NULL,
  course_duration TEXT NOT NULL,
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
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since we're not using auth)
CREATE POLICY "Allow all operations on students" ON students FOR ALL USING (true);

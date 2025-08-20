-- Update class_a_students table to ii_it_students
ALTER TABLE class_a_students RENAME TO ii_it_students;

-- Update class_b_students table to iii_it_students  
ALTER TABLE class_b_students RENAME TO iii_it_students;

-- Add missing columns to ii_it_students
ALTER TABLE ii_it_students 
ADD COLUMN IF NOT EXISTS register_number TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS mobile TEXT,
ADD COLUMN IF NOT EXISTS nptel_course_name TEXT,
ADD COLUMN IF NOT EXISTS nptel_course_id TEXT,
ADD COLUMN IF NOT EXISTS course_duration INTEGER;

-- Add missing columns to iii_it_students
ALTER TABLE iii_it_students 
ADD COLUMN IF NOT EXISTS register_number TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS mobile TEXT,
ADD COLUMN IF NOT EXISTS nptel_course_name TEXT,
ADD COLUMN IF NOT EXISTS nptel_course_id TEXT,
ADD COLUMN IF NOT EXISTS course_duration INTEGER;

-- Update RLS policies for renamed tables
DROP POLICY IF EXISTS "Users can insert their own data" ON class_a_students;
DROP POLICY IF EXISTS "Users can view their own data" ON class_a_students;
DROP POLICY IF EXISTS "Users can update their own data" ON class_a_students;

DROP POLICY IF EXISTS "Users can insert their own data" ON class_b_students;
DROP POLICY IF EXISTS "Users can view their own data" ON class_b_students;
DROP POLICY IF EXISTS "Users can update their own data" ON class_b_students;

-- Create RLS policies for ii_it_students
CREATE POLICY "Users can insert their own data" ON ii_it_students
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own data" ON ii_it_students
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own data" ON ii_it_students
    FOR UPDATE USING (true);

-- Create RLS policies for iii_it_students
CREATE POLICY "Users can insert their own data" ON iii_it_students
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own data" ON iii_it_students
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own data" ON iii_it_students
    FOR UPDATE USING (true);

-- Add missing class_name and email columns to both tables
ALTER TABLE ii_it_students 
ADD COLUMN IF NOT EXISTS class_name TEXT,
ADD COLUMN IF NOT EXISTS email TEXT;

ALTER TABLE iii_it_students 
ADD COLUMN IF NOT EXISTS class_name TEXT,
ADD COLUMN IF NOT EXISTS email TEXT;

-- Set default class_name values for existing records
UPDATE ii_it_students SET class_name = 'II-IT' WHERE class_name IS NULL;
UPDATE iii_it_students SET class_name = 'III-IT' WHERE class_name IS NULL;

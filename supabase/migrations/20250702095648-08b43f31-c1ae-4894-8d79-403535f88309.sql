-- Create a table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact submissions
CREATE POLICY "Anyone can submit contact form" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admin access (you can modify this based on your admin setup)
CREATE POLICY "Admin can view all contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (true); -- You might want to restrict this to admin users only

-- Add index for better performance on created_at for sorting
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
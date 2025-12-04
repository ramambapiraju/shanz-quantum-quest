-- Create newsletter subscribers table
CREATE TABLE public.newsletter_subscribers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for newsletter signups
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Create resource bookmarks table for future user features
CREATE TABLE public.resource_views (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    resource_id TEXT NOT NULL,
    viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    session_id TEXT
);

-- Enable RLS
ALTER TABLE public.resource_views ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for analytics
CREATE POLICY "Anyone can log resource views" 
ON public.resource_views 
FOR INSERT 
WITH CHECK (true);
-- Add restrictive SELECT policy to prevent unauthorized reads of newsletter subscriber emails
CREATE POLICY "Restrict newsletter reads" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (false);
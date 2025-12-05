-- Add restrictive SELECT policy to prevent unauthorized reads on analytics data
CREATE POLICY "Restrict analytics reads" 
ON public.resource_views 
FOR SELECT 
USING (false);
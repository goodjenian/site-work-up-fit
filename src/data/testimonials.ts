/**
 * Testimonials.
 *
 * Empty on purpose. No real testimonial has been supplied, and inventing one
 * would be a fabricated endorsement. The social-proof section on the homepage
 * detects the empty array and renders the brand's own proof (the eleven
 * methodologies) instead of a fake quote wall.
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  city?: string;
  avatar?: string;
  programSlug?: string;
};

export const testimonials: Testimonial[] = [];

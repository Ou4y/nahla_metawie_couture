USE couture_reservations;

-- Admin account (replace password hash before production use)
INSERT INTO users (email, password_hash, role, first_name, last_name, phone)
VALUES (
  'nahla@admin.admin',
  '$2a$10$tDNdlQc1e7y1/ZBrvE.jAuzfGQyML7ZVKPi/ZGxDQDACL8kWJOi.u',
  'admin',
  'Nahla',
  'Admin',
  '+201201774547'
);

INSERT INTO working_days (id, day_of_week, is_active)
VALUES
  (1, 1, 1),
  (2, 2, 1),
  (3, 3, 1),
  (4, 4, 1),
  (5, 5, 1);

INSERT INTO working_hours (working_day_id, start_time, end_time, is_active)
VALUES
  (1, '09:00:00', '12:00:00', 1),
  (1, '13:00:00', '17:00:00', 1),
  (2, '09:00:00', '12:00:00', 1),
  (2, '13:00:00', '17:00:00', 1),
  (3, '09:00:00', '12:00:00', 1),
  (3, '13:00:00', '17:00:00', 1),
  (4, '09:00:00', '12:00:00', 1),
  (4, '13:00:00', '17:00:00', 1),
  (5, '09:00:00', '12:00:00', 1),
  (5, '13:00:00', '17:00:00', 1);

INSERT INTO website_content (slug, title, body, is_published)
VALUES
  ('home', 'Home', 'Welcome to Nahla Couture.', 1),
  ('about', 'About', 'Our story and couture philosophy.', 1),
  ('gallery', 'Gallery', 'Signature pieces and seasonal highlights.', 1),
  ('contact', 'Contact', 'Get in touch with the atelier.', 1);

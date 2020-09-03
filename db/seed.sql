USE famspace_db;

ALTER TABLE fam AUTO_INCREMENT = 1;
-- brings table id back to 1

INSERT INTO fam
    (fam_Key, created_at, updated_at)
VALUES
    ('crazyCostanzas26', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('happySeinfelds45', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- seed files into user database



INSERT INTO user
    (first_name, last_name, birthdate, email, username, user_password, fam_id)
VALUES
    ('Frank', 'Costanza', '1927-06-08 05:00', 'fCostanza@fakeMail.com', 'fCostanza', '$erenityNow', 1),
    ('George', 'Costanza', '1958-04-016 05:00', 'gCostanza@fakemail.com', 'gCostanza', '$erenityNow', 1),
    ('Estelle', 'Costanza', '1928-04-04 05:00', 'eCostanza@fakemailcom', 'eCostanza', '$erenityNow', 1),
    -- second Family
    ('Shane', 'McFadden', '1995-02-04', 'sMcfadden@fakemail.com', 'sMcfadden', '$erenityNow', 2),
    ('Jerry', 'Seinfield', '1954-04-29', 'jSeinfield@fakemail.com', 'jSeinfield', '$erenityNow', 2),
    ('Cory', 'Keifer', '1996-06-06 05:00', 'cKeifer@fakemail.com', 'cKeifer', '$erenityNow', 2),
    ('Bruce', 'Wayne', '1963-02-19', 'bWayne@fakemail.com', 'bWayne', '$erenityNow', 2),
    ('Tom', 'Holland', '1996-06-01', 'tHolland@fakemail.com', 'tHolland', '$erenityNow', 2);

-- creates 2 sets of 'Families'
-- select * from user          this shows table of users
-- select first_name, last_name, fam_key from fam, user where fam.id=fam_id;   This checks that users are in correct family


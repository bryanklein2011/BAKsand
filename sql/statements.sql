
    INSERT INTO profile(profile_id, profile_activation_token, profile_avatar_url,profile_at_handle, profile_email, profile_hash, profile_phone)
    VALUES (gen_random_uuid(),'nananananananananananananana', 'myhandle', 'djdjd', 'i@type.slowly',
            'nananananananananananananananananananananananananananananananananananananananananana1', '505-866-5309');

    INSERT INTO profile(profile_id, profile_activation_token, profile_avatar_url,profile_at_handle, profile_email, profile_hash, profile_phone)
    VALUES (gen_random_uuid(),'nananananananananananananana2', 'myhandle2', 'djdjd2', 'i@type.slowly2',
            'nananananananananananananananananananananananananananananananananananananananananana2', '505-866-5309');

INSERT INTO tweet(tweet_id, tweet_profile_id, tweet_content, tweet_date) VALUES (gen_random_uuid(),
'd86b50ab-3526-410d-931f-2da336ea9b79', 'when I buy companies I bring in random sinks and burn the company to the ground',NOW());

SELECT tweet_id, tweet_profile_id, tweet_content, tweet_date from tweet;

SELECT tweet_id, tweet_profile_id, tweet_content, tweet_date from tweet WHERE tweet_id = 'ff9e0d59-a672-4e7c-933e-cfa61c169c77';

DELETE FROM tweet where tweet_id = 'ff9e0d59-a672-4e7c-933e-cfa61c169c77';

UPDATE tweet SET tweet_content = 'twitter' WHERE tweet_id = 'ff9e0d59-a672-4e7c-933e-cfa61c169c77';

INSERT INTO project(project_id, project_profile_id, project_due_date, project_description, project_name)
VALUES (gen_random_uuid() 'nananananananananananananana','2022-11-01', 'project 1 description','project 1 name');

SELECT project_id,project_profile_id, project_due_date, project_description, project_name, profile.profile_name FROM project WHERE project_id=
                                                                                                             ''
SELECT project_id,project_profile_id, project_due_date,project_name FROM project INNER JOIN profile ON
    project.project_profile_id = profile.profile_id = profile.profile_id WHERE project.project_name like '%1%';

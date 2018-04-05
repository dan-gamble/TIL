Kindly from: https://code.djangoproject.com/ticket/25313#comment:2

1. Create a custom user model identical to `auth.User`, call it User (so many-to-many tables keep the same name) and set `db_table='auth_user'` (so it uses the same table)
2. Throw away all your migrations
3. Recreate a fresh set of migrations
4. Make a backup of your database
5. Truncate the `django_migrations` table
6. Fake-apply the new set of migrations
7. Unset `db_table`, make other changes to the custom model, generate migrations, apply them

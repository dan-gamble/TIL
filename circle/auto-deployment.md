Instructions are as follows:

* Ensure you're using `onespacemedia-server-management>=0.4.2`
* Generate an SSH keypair:

```
mkdir dist
ssh-keygen -f dist/project_name
```

* Go to the project settings on CircleCI, then go to SSH Permissions
* Add the domain name into the hostname field (e.g. project.onespace.media)
* Paste the private key into the textarea.
* SSH into the application server.
* Add the generated public key (dict/project_name.pub) to `~/.ssh/authorized_keys`
* Update your circle.yml with the following:

```
deployment:
  staging:
    branch: develop
    commands:
      - python manage.py update
```

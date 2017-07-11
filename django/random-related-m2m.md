```python
def get_current_trials(self):
    # Select the ones the user has chosen
    selected_trials = list(self.trials.all())

    # If we already have enough, no more work!
    if len(selected_trials) >= 3:
        return random.sample(selected_trials, 3)

    # If we don't have enough items we'll just get all the available filler items.
    filler_trials = list(Trial.objects.exclude(
        id__in=[x.id for x in selected_trials]
    ).filter(
        approved=True
    ))

    selected_trials.extend(filler_trials)

    if len(selected_trials) >= 3:
        return random.sample(selected_trials, 3)

    return random.sample(selected_trials, len(selected_trials))
```

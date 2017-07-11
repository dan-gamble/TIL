```python
def get_current_trials(self):
    # Select the ones the user has chosen
    selected_trials = self.trials.all().order_by('?')[:3]

    # If we already have enough, no more work!
    if selected_trials.count() == 3:
        return selected_trials

    # If we don't have enough items we'll just get all the available filler items.
    filler_trials = Trial.objects.filter(
        approved=True,
    ).exclude(
        id__in=[x.id for x in selected_trials],
    ).order_by('?')[:3 - len(selected_trials)]

    return selected_trials.union(filler_trials)
```

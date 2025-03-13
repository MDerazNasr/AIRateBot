from django.db import models

class Complaint(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    complaint = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Complaint from {self.name} ({self.email})"

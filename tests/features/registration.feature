Feature: User Registration
  As a new user,
  I want to register on the website
  So that I can create an account and use the services.

  Background:
    Given a user is on the registration page

  Scenario: Successful Registration
    When the user fills the registration form with valid data
    And submits the form
    Then the user should see a success message

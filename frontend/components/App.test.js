// Write your tests here
import React from "react"
import AppFunctional from "./AppFunctional"
import { render, waitFor,screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'




test('[1] Heading renders correctly', () => {
  expect(screen.findByText('Welcome to the GRID')).toBeVisible;
})

test('[2] Submit button renders correctly', () => {
  expect(screen.findByText('Submit')).toBeVisible;
})

test('[3] Reset button renders correctly', () => {
  expect(screen.findByText('reset')).toBeVisible;
})

test('[4] "Coordinates (2,2)" renders correctly on page load', () => {
  expect(screen.findByText('Coordinates (2, 2)')).toBeVisible;
})

test('[5] Typing in the email input correctly changes the value', async () => {

  email = userEvent.setup()
  emailInput = screen.getByPlaceholderText('type email')

  await email.type(emailInput, 'lady@gaga.com')
  expect(emailInput).toHaveValue('lady@gaga.com')
})
/*
// TEST LIST
  // heading (Welcome to the GRID)
  // submit
  // reset
  // coordinates(x, x)
  // input value changes on typing

  test('sanity', () => {
    expect(true).toBe(true)
  })

  ### MVP 2, Testing

  - Using `codegrade_mvp.test.js` as inspiration, write 5 tests inside `frontend/components/App.test.js`:
    - From inside the test file, import `AppFunctional.js`.
    - Test that the visible texts in headings, buttons, links... render on the screen.
    - Test that typing on the input results in its value changing to the entered text.
*/
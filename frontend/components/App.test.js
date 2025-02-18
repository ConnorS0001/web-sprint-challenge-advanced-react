// Write your tests here
import React from "react"
import AppFunctional from "./AppFunctional"
import { render, waitFor,screen } from "@testing-library/react"
//import userEvent from '@testing-library/user-event'
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
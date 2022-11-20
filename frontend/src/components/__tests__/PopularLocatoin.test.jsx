import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PopularLocation from '../PopularLocation';

test("loads and display a location's brief forecast", async () => {
  // ARRANGE
  const { container } = render(
    <BrowserRouter>
      <PopularLocation
        forecast="Expect rain and scattered thunderstorms by 12:00pm."
        state="CLOUDY"
        location="Port Harcourt, Nigeria"
      />
    </BrowserRouter>,
  );

  // ASSERT
  expect(container.querySelector('h3')).toHaveTextContent(
    'Port Harcourt, Nigeria',
  );
  expect(container.querySelector('h5')).toHaveTextContent('CLOUDY');
  expect(container.querySelector('p')).toHaveTextContent(
    'Expect rain and scattered thunderstorms by 12:00pm.',
  );
  expect(container.querySelector('a')).toHaveAttribute('href', '/dashboard');
});

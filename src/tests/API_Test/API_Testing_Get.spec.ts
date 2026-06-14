//get method with path parameter and validating the json response body
import { test, expect } from '@playwright/test';

test('GetBooking API', async ({ request }) => {
    //normal way to get the response body
    // const response = await request.get('https://restful-booker.herokuapp.com/booking/1');
    const bookID = 12;
    const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookID}`);
    expect(response.status()).toBe(200);

    const jsonResponse = await response.json();

    expect(jsonResponse.firstname).toBeTruthy();
    expect(jsonResponse.lastname).toBeTruthy();
    expect(jsonResponse.totalprice).toBe(111);
    expect(jsonResponse.depositpaid).toBe(true);
    
    expect(jsonResponse.bookingdates.checkin).toBe('2018-01-01');
    expect(jsonResponse.bookingdates.checkout).toBe('2019-01-01');
});
import { test, expect } from '@playwright/test';
import logger from '@utils/logger';

test.describe('Create and update the booking with auth', async () => {
    test('Checking the update API after creating it first', async ({ request }) => {
        const baseURL = 'https://restful-booker.herokuapp.com';

        const baseHeaders = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
        const payload = {
            "firstname": "Shital",
            "lastname": "Gawande",
            "totalprice": 890,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2026-01-05",
                "checkout": "2026-01-06"
            },
            "additionalneeds": "Breakfast"
        }

        let token = '';
        let bookingID = 0;

        await test.step('get the token for authentication', async () => {
            const authResponse = await request.post(`${baseURL}/auth`, {
                headers: baseHeaders,
                data: {
                    username: 'admin',
                    password: 'password123'
                }
            });
            expect(authResponse.status()).toBe(200);
            const data = await authResponse.json();
            token = data.token;
            expect(token).toBeTruthy();
            logger.info('Created auth token for PUT booking flow');
        });

        await test.step('create a booking', async ({ }) => {

            const createBookingRes = await request.post(`${baseURL}/booking`, {
                headers: baseHeaders,
                data: payload,
            });
            expect(createBookingRes.status()).toBe(200);
            const createBookingData = await createBookingRes.json();
            bookingID = createBookingData.bookingid;
            expect(bookingID).toBeTruthy();
            logger.info(`Created booking with ID: ${bookingID}`);
        });

        await test.step('update the booking and use the token async', async () => {
            const putRes = await request.put(`${baseURL}/booking/${bookingID}`, {
                headers: {
                    ...baseHeaders,
                    'Cookie': `token=${token}`
                },
                data: {
                    "firstname": "Shital",
                    "lastname": "Takalikar",
                    "totalprice": 111,
                    "depositpaid": true,
                    "bookingdates": {
                        "checkin": "2018-01-01",
                        "checkout": "2019-01-01"
                    },
                    "additionalneeds": "Breakfast"
                }
            });
            expect(putRes.status()).toBe(200);
            const putData = await putRes.json();
            expect(putData.lastname).toBe('Takalikar');
            expect(putData.totalprice).toBe(111);
            logger.info(`Updated booking with ID: ${bookingID}`);
        });


    });

});
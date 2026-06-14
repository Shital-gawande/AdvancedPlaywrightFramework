import { test, expect } from '@playwright/test';


test('Ping ->checking the API is working', async ({ request }) => {

    const responsedata = await request.get('https://restful-booker.herokuapp.com/ping');
    expect(responsedata.status()).toBe(201);
    const text = await responsedata.text();
    expect(text).toContain('Created');
});

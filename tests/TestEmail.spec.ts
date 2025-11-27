import { test, expect } from '@playwright/test';
import{faker} from '@faker-js/faker';
import { sendMail } from '../mail';
import { addResult, getResults } from '../resultsCollector'; 


let srNo = 1;
//let testResults: {srNo: any, module: any, status: any, URL: any }[] = [];
let status = 'Fail';


const successMessageSelector = 'Login : Successfully Login'; 
const errorMessageSelector = 'Login : Login failed'; 

test.beforeEach('Login', async ({ page })=> {

  await page.goto('https://devlogin.authparency.com/orgs');
    
  console.log("\x1b[1mLogin:\x1b[0m");
  console.log("🔐 Starting Login Module Tests...");

    const Email = "foram.amin@outamation.com";
    const Password = "Outamation@1234";
  
    await page.locator('input[type="email"]').click();
    await page.locator('input[type="email"]').fill(Email);
    await page.waitForTimeout(1000);
    await page.locator('[type="submit"]').click();
    await page.waitForTimeout(1000);
    await page.locator('[name="passwd"]').click();
    await page.getByPlaceholder("Password").fill(Password);
    await page.waitForTimeout(1000);
    await page.locator('[type="submit"]').click();
    await page.getByRole('button', { name: "Yes" }).click();
    await page.waitForTimeout(1000); 
     if (successMessageSelector) {
        console.log("✅ User logged in Successfully.");
        await page.waitForTimeout(1500); 
    } else if (errorMessageSelector) {
        console.log("❌ User login failed.");
        await page.waitForTimeout(1500); 
    } else {
        console.log('Login status unknown: No success or error message displayed.');
        await page.waitForTimeout(1500); 
    }

       
         if (page.url().includes('https://devlogin.authparency.com/orgs')) {

        status = 'Pass';  
        addResult({
            srNo: '1',
            module: 'Login',
            status: 'Pass',
            URL: '<a href="https://devlogin.authparency.com/orgs">Login</a>'
        });
    } else {
        addResult({
            srNo: '1',
            module: 'Login',
            status: 'Fail',
            URL: '<a href="https://devlogin.authparency.com/orgs">Login</a>'
        });
    }
 
});


test(' CreatedOrder', async ({ page }) => {

          //PAUAT //EPA
    await page.locator('body > div > main > div > div:nth-child(3) > a > div').click();
    //await page.locator('a[href="/orgs/bb0afc99-7376-4cab-898c-b0f3e3e381de/practices"]').click();
    await page.locator('body > div > main > div > div:nth-child(3) > a').click();
    //await page.locator('[class="btn btn-default"]').click();
    await page.locator('button[class="btn btn-default"]').click(); //Popup Box
    await page.waitForTimeout(1000);  
    await page.locator('a[href="/orders"]').click();

       //Orders Grid
    await page.waitForTimeout(1000);  
    await page.locator('a[href="/orders"]').click();
    await page.waitForTimeout(1000);

      //EPA Search From All Orders
      await page.locator('div> a[id="orderDropdownMenuLink"]').click();
      await page.waitForTimeout(1000);
      await page.locator('li> button[data-filtertype="AllOrder"]').click();
      await page.waitForTimeout(1000);

      //Search Bar
      await page.locator('input[placeholder="Press Enter To Search"]').click();
      await page.waitForTimeout(1000);  
      await page.locator('input[placeholder="Press Enter To Search"]').fill("15518");
      await page.waitForTimeout(1000);  
      //Press Enter
      await page.locator('input[placeholder="Press Enter To Search"]').press('Enter');
      await page.waitForTimeout(1000); 


});

test.afterAll(async () => {
  console.log('All tests completed.');
  const results = getResults();
 await sendMail(results);
 
});
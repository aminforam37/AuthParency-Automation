import { test, expect } from '@playwright/test';
import{faker} from '@faker-js/faker';
import { sendMail } from '../mail';
import { addResult, getResults } from '../resultsCollector'; 


let srNo = 1;
//let testResults: {srNo: any, module: any, status: any, URL: any }[] = [];
let status = 'Fail';



test.beforeEach('Login', async ({ page })=> {

  await page.goto('https://devlogin.authparency.com/orgs');
    
  console.log("\x1b[1mLogin:\x1b[0m");
  console.log("🔐 Starting Login Module Tests...");

    const Email = "foram.amin@outamation.com";
    const Password = "Pramukh@108";
    const successMessageSelector = 'Login : Successfully Login'; 
    const errorMessageSelector = 'Login : Login failed';
  
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
 
});

test('@Authparency: Resources', async ({ page }) => {

    await page.waitForTimeout(1500);
  
    // //PAUAT //EPA
    // await page.locator('body > div > main > div > div:nth-child(3) > a > div').click();
    // //await page.locator('a[href="/orgs/bb0afc99-7376-4cab-898c-b0f3e3e381de/practices"]').click();
    // await page.locator('body > div > main > div > div:nth-child(3) > a').click();
    // //await page.locator('[class="btn btn-default"]').click();
    // await page.locator('button[class="btn btn-default"]').click(); //Popup Box
    // await page.waitForTimeout(1000);  

    //(DEMO)
    await page.waitForSelector('body > div > main > div > div:nth-child(2) > a > div > div');
    await page.waitForTimeout(1000);  
    await page.locator('body > div > main > div > div:nth-child(2) > a > div > div').click();
    await page.waitForTimeout(1000);  
    await page.locator('[href="https://demo.authparency.com/microsoftidentity/account/signin?p=DefaultPractice"]').click();
    await page.waitForTimeout(1000);


    console.log("");
    console.log("\x1b[1mResources:\x1b[0m"); 
    console.log("📦 Navigating to Resources page...");

    await page.locator('a[href="/resources"]').click();
    await page.waitForTimeout(1000);

        await page.locator('button[id="AppealTemplates"]').click();
        await page.waitForTimeout(1000);
        const Resources = 'div[id="ResContent"]';

    try {
        await page.waitForSelector(Resources, { state: 'visible', timeout: 5000 });
        const isTableVisibleData = await page.isVisible(Resources);
        await page.waitForTimeout(1000);
        //console.log(`Graph visible: ${isTableVisiblegraph}`);

    if (isTableVisibleData) {
        console.log("✅ Appeal Templates loaded successfully.");
    
    } else {
        console.log("❌ Appeal Templates failed to load.");
    
    }
    }catch (error) {
     const err = error as Error;
     console.log("❌ Error while waiting for Appeal Templates to become visible:", err.message);
   }

            await page.locator('button[id="UsefulWebsites"]').click();
        await page.waitForTimeout(1000);
        const Resources1 = 'div[id="ResContent"]';

    try {
        await page.waitForSelector(Resources1, { state: 'visible', timeout: 5000 });
        const isTableVisibleData = await page.isVisible(Resources);
        await page.waitForTimeout(1000);
        //console.log(`Graph visible: ${isTableVisiblegraph}`);

    if (isTableVisibleData) {
        console.log("✅ Knowledge Base loaded successfully.");
    
    } else {
        console.log("❌ Knowledge Base failed to load.");
    
    }
    }catch (error) {
     const err = error as Error;
     console.log("❌ Error while waiting for Knowledge Base to become visible:", err.message);
   }


    

      if (page.url().includes('https://demo.authparency.com/resources')) //https://dev.authparency.com/resources
        {
    
            status = 'Pass';  
            addResult({
                srNo: '8',
                module: 'Resources',
                status: 'Pass',
                URL: '<a href="https://demo.authparency.com/resources">Resources</a>'
            });
        } else {
            addResult({
                srNo: '8',
                module: 'Resources',
                status: 'Fail',
                URL: '<a href="https://demo.authparency.com/resources">Resources</a>'
            });
        }
    
 


});
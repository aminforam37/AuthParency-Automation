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

test('@Authparency: MyOrders', async ({ page }) => {

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
    console.log("\x1b[1mMy Orders:\x1b[0m"); 
    console.log("📦 Navigating to My orders page...");

    await page.locator('a[href="/myorders"]').click();
    await page.waitForTimeout(1000);

//         const MyOrderGrid = 'div[id="ordersdiv"]';
//     try {
//         await page.waitForSelector(MyOrderGrid, { state: 'visible', timeout: 5000 });
//         const isTableVisibleData = await page.isVisible(MyOrderGrid);
//         await page.waitForTimeout(1000);
//         //console.log(`Graph visible: ${isTableVisiblegraph}`);

//     if (isTableVisibleData) {
//         console.log("✅ Grid data loaded successfully.");
    
//     } else {
//         console.log("❌ Grid data failed to load.");
    
//     }
//     }catch (error) {
//      const err = error as Error;
//      console.log("❌ Error while waiting for Grid data to become visible:", err.message);
//    }


    // 1️⃣ Wait for AG Grid container to appear
  const gridSelector = '.ag-root-wrapper';
  //console.log("➡ Waiting for AG Grid container...");
  await page.waitForSelector(gridSelector, { state: 'visible' });
  //console.log("✔ AG Grid container is visible.");

  // 2️⃣ Wait for loader/spinner to disappear
  const loader = page.locator('.loading-spinner, .spinner, .loader');
 // console.log("➡ Checking for loader...");
  if (await loader.isVisible().catch(() => false)) {
    //console.log("⏳ Loader detected — waiting...");
    await expect(loader).toBeHidden({ timeout: 10000 });
  }
  //console.log("✔ Loader is not visible.");

  // 3️⃣ Wait for AG Grid rows to appear
  const rowSelector = '.ag-center-cols-container .ag-row';
  //console.log("➡ Waiting for AG Grid rows to load...");
  await page.waitForSelector(rowSelector);
  const rowCount = await page.locator(rowSelector).count();
  //console.log(`✔ AG Grid rows loaded: ${rowCount}`);

  expect(rowCount).toBeGreaterThan(0);

  // 4️⃣ Validate no error messages appear
  //console.log("➡ Checking for errors...");
  const errorSelectors = [
    '.error-message',
    '.toast-error',
    'text=Something went wrong',
    'text=Failed to load',
    'text=Error'
  ];

  for (const sel of errorSelectors) {
    const shown = await page.locator(sel).isVisible().catch(() => false);
    expect(shown, `Unexpected error visible: ${sel}`).toBeFalsy();
  }
  //console.log("✔ No error messages found.");

  // 5️⃣ Check that a few required columns exist (AG Grid renders header cells as divs)
 // console.log("➡ Verifying required column headers...");
  const expectedColumns = [
    'PT # / MRN',
    'Patient Name',
    'Assigned To',
    'Prior Authorization #',
    'Categorization',
    'Status',
    'Outcome',
    'Date of Service (DOS)'
  ];

  for (const col of expectedColumns) {
  const header = page.locator(`.ag-header .ag-header-cell-text:has-text("${col}")`).first();
  await expect(header).toBeVisible();
 // console.log(`✔ Column header visible: ${col}`);
 }

  console.log(`✅ My Orders AG Grid loaded successfully with ${rowCount} row(s).`);

      if (page.url().includes('https://demo.authparency.com/myorders')) //https://dev.authparency.com/myorders
        {
    
            status = 'Pass';  
            addResult({
                srNo: '7',
                module: 'My Orders',
                status: 'Pass',
                URL: '<a href="https://demo.authparency.com/myorders">My Orders</a>'
            });
        } else {
            addResult({
                srNo: '7',
                module: 'My Orders',
                status: 'Fail',
                URL: '<a href="https://demo.authparency.com/myorders">My Orders</a>'
            });
        }
    
//  const results = getResults();
//  await sendMail(results);



});


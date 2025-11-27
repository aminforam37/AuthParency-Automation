import { test, expect } from '@playwright/test';
import{faker} from '@faker-js/faker';
const path = require('path');


const firstName = faker.person.firstName();
const middleName = faker.person.middleName().charAt(0);
const lastName = faker.person.lastName();
const inputMRN = faker.number.int({ min: 10000, max: 99999 }).toString();
const address = faker.location.streetAddress();
const city = faker.location.city();
const postalCode = faker.location.zipCode(faker.number.int({ min: 10000, max: 99999 }).toString());
const contactnumber = faker.phone.number();
const memberID = faker.number.int({ min: 10000, max: 99999 }).toString();
const doseunit = faker.number.int({min:1 , max:20});
const unit = `${doseunit}MG`;
const Frequency = faker.number.int({min:1,max:50}).toString();
const Quantity = faker.number.int({min:1,max:50}).toString();
const cyclecount = faker.number.int({min:1, max:50}).toString();
const ProQuantity = faker.number.int({min:1,max:50}).toString();
const editdose = faker.number.int({min:1 , max:20});
const editunit = `${editdose}MG`;
const editfrequency = faker.number.int({min:1, max:50}).toString();
const successMessageSelector = 'Login : Successfully Login'; 
const errorMessageSelector = 'Login : Login failed'; 




test.beforeEach('Login', async ({ page })=> {

  await page.goto('https://devlogin.authparency.com/orgs');
    
  console.log("\x1b[1mLogin:\x1b[0m");
  console.log("🔐 Starting Login Module Tests...");

    const Email = "foram.amin@outamation.com";
    const Password = "Pramukh@108";
  
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



test('@Authparency: ClientOrder', async ({ page }) => {

    //  //PAUAT //EPA
    // await page.locator('body > div > main > div > div:nth-child(3) > a > div').click();
    // //await page.locator('a[href="/orgs/bb0afc99-7376-4cab-898c-b0f3e3e381de/practices"]').click();
    // await page.locator('body > div > main > div > div:nth-child(3) > a').click();
    // //await page.locator('[class="btn btn-default"]').click();
    // await page.locator('button[class="btn btn-default"]').click(); //Popup Box
    // await page.waitForTimeout(1000);  
    // await page.locator('a[href="/client-order"]').click();


        //(DEMO)
    await page.waitForSelector('body > div > main > div > div:nth-child(2) > a > div > div');
    await page.waitForTimeout(1000);  
    await page.locator('body > div > main > div > div:nth-child(2) > a > div > div').click();
    await page.waitForTimeout(1000);  
    await page.locator('[href="https://demo.authparency.com/microsoftidentity/account/signin?p=DefaultPractice"]').click();
    await page.locator('a[href="/client-order"]').click();
    await page.waitForTimeout(1000);
    
    console.log("");
    console.log(" \x1b[1mOrder Creation:\x1b[0m"); 
    console.log("📝 Initiating new order creation flow...");

    // Order create +
    await page.locator('a[href="/client-order/create"]').click();
    await page.waitForTimeout(1000);

    await page.locator('input[name="firstName"]').fill(firstName);
    await page.waitForTimeout(1500);
   
    await page.locator('input[name="middleName"]').fill(middleName);
    await page.waitForTimeout(1500);
    
    await page.locator('input[name="lastName"]').fill(lastName);
    await page.waitForTimeout(1500);

    await page.locator('input[name="MRN"]').fill(inputMRN); 
    await page.waitForTimeout(1500);

    //Date 
    await page.waitForTimeout(1000);  
    await page.locator('input[name="patientdob"]').click();
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1500);

    await page.locator('span[class="selection"]').nth(1).click();
    await page.waitForTimeout(1000);  
    await page.locator('li[class="select2-results__option"]').nth(1).click();
    await page.waitForTimeout(1000);  

    await page.locator('[id="address"]').fill(address);
    await page.locator('[id="city"]').fill(city);
    await page.locator('[id="zip"]').fill(postalCode);
    await page.locator('[class="selection"]').nth(2).click();
    await page.locator('[class="select2-result-repository__title"]').nth(1).click();

    
    await page.locator('[id="contactnumber"]').fill(contactnumber);
    await page.waitForTimeout(1500);

    //Insurance
    //Date of service
    await page.locator('input[id="DOSStart"]').click();
    await page.waitForTimeout(1000);  
    await page.locator('td[class="today day"]').click();
    await page.locator('[title="Add Insurance"]').click();
    await page.waitForTimeout(1000);
    await page.locator("li[role='option']").nth(1).click();  
    await page.waitForTimeout(1000);
    await page.locator('div> input[name="policyReq"]').fill(memberID);
    await page.waitForTimeout(1000); 
    await page.locator('span[role="textbox"]').nth(4).click();
    await page.locator('li[role="option"]').first().click();
    await page.waitForTimeout(1000); 
    await page.locator('[title="Save"]').click();

     // Physician
    await page.locator('[id="datereq"]').click();
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1000);  

    //Order Received
     await page.locator('[id="daterec"]').click();
     await page.locator('td[class="today day"]').click();
     await page.waitForTimeout(1000);
     
     //Place of service
    await page.locator('#Orderdetailsform').getByLabel('', { exact: true }).first().click(); 
    await page.locator("li[role='option']").nth(3).click();
  
    //Location
    await page.locator('[aria-labelledby="select2-userLocationId-container"]').click();
    await page.locator("li[role='option']").nth(2).click();
    
     //Categorization
    await page.locator('[aria-labelledby="select2-specialt-container"]').click();
    await page.locator("li[role='option']").nth(3).click();

    //State
    await page.locator('[aria-labelledby="select2-stat-container"]').click();
    await page.locator("li[role='option']").nth(1).click();

    //Requesting Provider DEMO
    await page.locator('input[name="reqname"]').pressSequentially('ACCIME', { delay: 100 }); // Types slower, like a user
    await page.waitForTimeout(1000); 
    await page.locator('#completionOptions > table > tbody > tr.suggestion').click();
    await page.waitForTimeout(1000); 

    //Rendering Provider
    await page.locator('input[name="sername"]').pressSequentially('ACCIME', { delay: 100 }); 
    await page.waitForTimeout(1000); 
    await page.locator('#completionOptions > table > tbody > tr.suggestion').click();
    await page.waitForTimeout(1000); 

    
    // //Requesting Provider  EPA DEV
    // await page.locator('span[aria-labelledby="select2-reqProvider-container"]').click();
    // await page.locator("li[role='option']").nth(1).click();

    // //Rendering Provider
    // await page.locator('span[aria-labelledby="select2-renProvider-container"]').click();
    // await page.locator("li[role='option']").nth(1).click();


    //Medications

    //Name
    await page.locator('span[id="drugbtnparent1"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('span[id="select2-drugname400-container"]').pressSequentially('RITUXAN', { delay: 100 });
    await page.waitForTimeout(1000); 
    await page.locator('li[role="option"]').nth(0).click();
    await page.waitForTimeout(1000); 

    //Dosage
    await page.locator('span[aria-labelledby="select2-dose400-container"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[class="select2-results__option select2-results__option--highlighted"]').click();
    await page.waitForTimeout(1000); 

    // //CPT Code
    // await page.locator('span[aria-labelledby="select2-cpt400-container"]').click();
    // await page.waitForTimeout(1000); 

    //DX Code 
    await page.locator('span[aria-labelledby="select2-primarydxcode400-container"]').click();
    await page.locator('input[aria-controls="select2-primarydxcode400-results"]').pressSequentially('a', { delay: 100 });
    await page.waitForTimeout(1000); 
    await page.locator('li[role="option"]').nth(1).click();
    await page.waitForTimeout(1000); 

    //Dose Unit 
    await page.locator('input[name="strengthToBeGivenReq"]').fill(unit);
    await page.waitForTimeout(1000); 

     // Frequency
     await page.locator('input[name="FreqReq"]').fill(Frequency);
     await page.waitForTimeout(1000); 

    // Quantity
    await page.locator('input[name="QtyReq"]').fill(Quantity);
    await page.waitForTimeout(1000); 

    //Cycle count
    await await page.locator('input[name="CycleReq"]').fill(cyclecount);
    await page.waitForTimeout(1000); 

    //Save
    await page.locator('[class="disabled actionbtn me-1"]').click();
    await page.waitForTimeout(1000); 

    //Add multiple medications
    await page.locator('span[id="select2-drugoncoselect-container"]').click();
    await page.waitForTimeout(1000)
    await page.locator('li[class="select2-results__option"]').nth(2).click();
    await page.waitForTimeout(1000); 

  //   //Toggle approval logic
    const toggleApproval = async (approvalRequired: boolean) => {
    const toggleButtons = page.locator('span[class="slider red round"]');
    const toggleCount = await toggleButtons.count();

    for (let i = 0; i < toggleCount; i++) {
    const toggleButton = toggleButtons.nth(i);
    await page.waitForTimeout(1000); 
    
    if (!(await toggleButton.isVisible())) {
      //console.log(`Toggle ${i} is not visible. Skipping.`);
      continue;
    }

    const isActive = await toggleButton.getAttribute('class') ?? '';
    if (!isActive.includes('active')) {
      //console.log(`Toggle ${i} is OFF, turning ON`);
      await toggleButton.click(); // Turn ON
    } else {
      //console.log(`Toggle ${i} is already ON`);
    }

    await page.waitForTimeout(1000); 
  }
};

  await page.waitForTimeout(1000); 
  await toggleApproval(true); // Toggle ON all that need it
  await page.waitForTimeout(3000);

  //delete logic
  const deleteButtons = page.locator('i[title="Delete"]');
  const deleteCount = await deleteButtons.count();

  for (const i of [5,4, 3, 2])  //Remove multiple medications 5 for DEV
     {
  if (i < deleteCount) {
    const btn = deleteButtons.nth(i);
    if (await btn.isVisible()) {
      //console.log(`Deleting medication at index ${i}`);
      await btn.click();
      await page.waitForTimeout(1000);
    } else {
      //console.log(`Delete button at index ${i} is not visible`);
    }
  } else {
   // console.log(`No delete button at index ${i}`);
  }
}
    
    //Edit 
    await page.locator('a.disabled.actionbtn.me-1.edit5000 i[title="Edit"]').click();
    await page.waitForTimeout(3000); 
    
    //Edit DX Code
    await page.locator('span> span[aria-labelledby="select2-primarydxcode5000-container"]').click();
    await page.locator('input[aria-controls="select2-primarydxcode5000-results"]').pressSequentially('s', { delay: 100 });
    await page.waitForTimeout(1000); 
    await page.locator('li[role="option"]').nth(1).click();
    await page.waitForTimeout(1000); 


    // await page.locator('input[class="form-control primarydxcode"]').click();
    // await page.locator('input[name="priDxCodeReq"]').pressSequentially('a2', { delay: 100 });
    // await page.waitForTimeout(1000); 
    // await page.locator('#completionOptions > table > tbody > tr.suggestion > td:nth-child(1)').click();
    // await page.waitForTimeout(1000); 
    
    //Edit Dose Unit 
    await page.locator('input[name="strengthToBeGivenReq"]').fill(editunit);
    await page.waitForTimeout(1000); 
    
    //Edit Frequency
    await page.locator('input[name="FreqReq"]').fill(editfrequency);
    await page.waitForTimeout(1000); 
    
    //Save After Editing
    await page.locator('[class="disabled actionbtn me-1"]').click();
    await page.waitForTimeout(1000); 

    //Procedures
    await page.locator('span[id="procbtnparent1"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('span[class="select2-search select2-search--dropdown"]').pressSequentially('Fr', { delay: 100 });
    await page.waitForTimeout(1000); 
    await page.locator('div[class="select2-result-repository__description"]').nth(3).click();
    await page.waitForTimeout(1500); 

    //DX Code 
    await page.locator('div[class="removemargin"]').nth(2).click();
    await page.locator('input[aria-controls="select2-primarydxcode100-results"]').pressSequentially('a', { delay: 100 });
    await page.waitForTimeout(1000); 
    await page.locator('li[role="option"]').nth(1).click();
    await page.waitForTimeout(1000); 


    //Quantity 
    await page.locator('div> input[name="QtyReqS"]').clear();
    await page.locator('div> input[name="QtyReqS"]').fill(ProQuantity);
    await page.waitForTimeout(1000); 


    //Save
    await page.locator('[class="disabled actionbtn me-1"]').click();
    await page.waitForTimeout(1000); 

    // //Add multiple procedures Demo
    // await page.locator('span[id="select2-oncoselect-container"]').click();
    // await page.waitForTimeout(1000)
    // await page.locator('li[class="select2-results__option"]').nth(3).click();
    // await page.waitForTimeout(1000); 
    // await page.locator('span[class="select2-selection__placeholder"]').click();
    // await page.waitForTimeout(1000); 
    // await page.locator('li[class="select2-results__option select2-results__option--highlighted"]').click();
    // await page.waitForTimeout(3000); 



    // Toggle approval logic
    const toggleProcedureApproval = async (approvalRequiredProcedure: boolean) => {
      const procedureToggleButtons = page.locator('.switchToggle.changeprocstatus.ms-2');
      const toggleCountprocedure = await procedureToggleButtons.count();
      
      for (let i = 0; i < toggleCountprocedure; i++) {
        const toggleButtonprocedure = procedureToggleButtons.nth(i);
      
        const isToggleOn = await toggleButtonprocedure.getAttribute('class');
      const currentClassProcedure = isToggleOn ?? '';

      if (approvalRequiredProcedure) {
        // If approval is required and the toggle is off, click it to turn it on
        if (!currentClassProcedure.includes('active')) {
          await toggleButtonprocedure.click();
          //console.log('Toggled ON for approval required.');
        }
      } else {
        // If approval is not required and the toggle is on, click it to turn it off
        if (currentClassProcedure.includes('active')) {
          await toggleButtonprocedure.click();
          //console.log('Toggled OFF for no approval required.');
        }
      }
      }
    };

    await page.waitForTimeout(1000); 
    // For Multiple medications
    await toggleProcedureApproval(true);  // Call with 'true' if approval is required
    await toggleProcedureApproval(false); // Call with 'false' if approval is not required
    await page.waitForTimeout(3000); 

    //Submit
    await page.locator('button[id="createbtn"]').click();
    await page.waitForTimeout(1000); 

    //Conf
    await page.locator('button[id="locationconfirmclick"]').click();
    await page.waitForTimeout(1000); 
    
    //Order Submitted
    await page.locator('a[href="/client-order"]').nth(1).click();
    await page.waitForTimeout(1000);



    if (inputMRN) {
      console.log(`✅ Order created successfully. MRN: ${inputMRN}.`);
    } else {
      console.log("❌ Order creation failed. Order ID not generated or submission was unsuccessful.");
    }


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
      await page.locator('input[placeholder="Press Enter To Search"]').fill(inputMRN);
      await page.waitForTimeout(1000);  
      //Press Enter
      await page.locator('input[placeholder="Press Enter To Search"]').press('Enter');
      await page.waitForTimeout(1000); 
      await page.locator(`a[title="Click to view order details"]:has-text("${inputMRN}")`).click();
      await page.waitForTimeout(1000); 

      //Order Assign
      await page.locator('span[id="select2-assigntootherselect-container"]').click();
      await page.waitForTimeout(3000); 
      await page.locator('.select2-result-repository__title').nth(1).click();
      await page.waitForTimeout(1000); 

      //click on Assign
      await page.locator('button[id="assignbtnClick"]').click();
      await page.waitForTimeout(1000); 

      //Save
      await page.locator('button[id="savebtnClick"]').click();
      await page.waitForTimeout(1000); 

      //Benefits Verification
    //Benefits verification performed by the client

    await page.locator('span[aria-labelledby="select2-PAprocess-container"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[class="select2-results__option"]').nth(3).click();
    await page.waitForTimeout(1000); 

     // No Prior Auth Required
    await page.locator('input[name="benefitver"]').nth(0).click();
    await page.waitForTimeout(1000); 

      //Close EHR
    await page.locator('input[name="EHRverclose"]').nth(0).click(); 
    await page.waitForTimeout(3000); 
  
   //Save Complete Benefits Verification
    await page.locator('button[id="closed"]').click();
    await page.waitForTimeout(1000); 

    //Close Confirmation
    await page.locator('a[id="closebtnClick"]').nth(0).click();
    await page.waitForTimeout(3000);
    
    //Upload Files For No Prior Auth Required
    const filePath1 = path.resolve('C:/Users/forum.amin/Authparency/Documents/PA-Dashboard Status Mapping-171224-071745.pdf'); 
    await page.setInputFiles('input[id="uploadfile"]', [filePath1] );
    await page.waitForTimeout(1000);
    await page.locator('span[aria-labelledby="select2-DocumentTypes_NoPA-container"]').click();
    await page.waitForTimeout(1000);
    await page.locator('li[class="select2-results__option"]').nth(4).click();
    await page.waitForTimeout(1000);
    await page.locator('button[id="UploadFileFornoPA"]').click();
    await page.waitForTimeout(1000);



});


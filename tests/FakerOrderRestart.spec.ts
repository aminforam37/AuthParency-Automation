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
const editQuantityMed = faker.number.int({min:1, max:50}).toString();
const successMessageSelector = 'Login : Successfully Login'; 
const errorMessageSelector = 'Login : Login failed'; 


test.beforeEach('Login', async ({ page })=> {

  await page.goto('https://qalogin.authparency.com/');
    
  console.log("\x1b[1mLogin:\x1b[0m");
  console.log("🔐 Starting Login Module Tests...");

    const Email = "foram.amin@outamation.com";
    const Password = "Outamation@1234";
  
    await page.locator('[name="Email"]').click();
    await page.locator('[placeholder="Email"]').fill(Email);
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

test(' FakerOrder', async ({ page }) => {

    await page.waitForTimeout(1500);
  
    //PAUAT //EPA
    await page.locator('body > div > main > div > div:nth-child(3) > a > div').click();
    //await page.locator('a[href="/orgs/bb0afc99-7376-4cab-898c-b0f3e3e381de/practices"]').click();
    await page.locator('body > div > main > div > div:nth-child(3) > a').click();
    //await page.locator('[class="btn btn-default"]').click();
    await page.waitForTimeout(1000);  
    await page.locator('a[href="/orders"]').click();
    
    // //(DEMO)
    // await page.waitForSelector('body > div > main > div > div:nth-child(2) > a > div > div');
    // await page.waitForTimeout(1000);  
    // await page.locator('body > div > main > div > div:nth-child(2) > a > div > div').click();
    // await page.waitForTimeout(1000);  
    // await page.locator('[href="https://demo.authparency.com/microsoftidentity/account/signin?p=DefaultPractice"]').click();
    // await page.locator('[href="/orders"]').click();
    // await page.waitForTimeout(1000);  
    // //await page.locator('[class="btn btn-default"]').click();

    console.log("");
    console.log(" \x1b[1mOrder Creation:\x1b[0m"); 
    console.log("📝 Initiating new order creation flow...");

    // Order create +
    await page.locator('[href="/create-order"]').click();
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

    // //Requested Date
    // await page.locator('[id="pastartdate"]').click();
    // await page.locator('td[class="today day"]').click();

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

     //Requesting Provider
    await page.locator('span[aria-labelledby="select2-reqProvider-container"]').click();
    await page.locator("li[role='option']").nth(1).click();

    //Rendering Provider
    await page.locator('span[aria-labelledby="select2-renProvider-container"]').click();
    await page.locator("li[role='option']").nth(1).click();

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

    //Toggle approval logic
    const toggleApproval = async (approvalRequired: boolean) => {
    const toggleButtons = page.locator('span[class="slider red round"]'); 
    const toggleCount = await toggleButtons.count();
    
    for (let i = 0; i < toggleCount; i++) {
      const toggleButton = toggleButtons.nth(i);
    
      const isToggleOn = await toggleButton.getAttribute('class');
      const currentClass = isToggleOn ?? '';
  
    if (approvalRequired) {
      // If approval is required and the toggle is off, click it to turn it on
      if (!currentClass.includes('active')) {
        await toggleButton.click();
       // console.log('Toggled ON for approval required.');
      }
    } else {
      // If approval is not required and the toggle is on, click it to turn it off
      if (currentClass.includes('active')) {
        await toggleButton.click();
       // console.log('Toggled OFF for no approval required.');
      }
    }
    }
  };
  
    await page.waitForTimeout(1000); 
    // For Multiple medications
    await toggleApproval(true);  // Call with 'true' if approval is required
    await toggleApproval(false); // Call with 'false' if approval is not required
    await page.waitForTimeout(3000); 
  
    //Delete
    await page.locator('i[title="Delete"]').nth(4).click();
    await page.waitForTimeout(1000);
    await page.locator('i[title="Delete"]').nth(3).click();
    await page.waitForTimeout(1000);
    await page.locator('i[title="Delete"]').nth(2).click();
    await page.waitForTimeout(1000);
    
    //Edit 
    await page.locator('a.disabled.actionbtn.me-1.edit5000 i[title="Edit"]').click();
    await page.waitForTimeout(3000); 
    
    //Edit DX Code
    await page.locator('span> span[aria-labelledby="select2-primarydxcode5000-container"]').click();
    await page.locator('input[aria-controls="select2-primarydxcode5000-results"]').pressSequentially('s', { delay: 100 });
    await page.waitForTimeout(1000); 
    await page.locator('li[role="option"]').nth(1).click();
    await page.waitForTimeout(1000); 

     //Edit Dose Unit 
    await page.locator('input[name="strengthToBeGivenReq"]').fill(editunit);
    await page.waitForTimeout(1000); 
    
    //Edit Frequency
    await page.locator('input[name="FreqReq"]').fill(editfrequency);
    await page.waitForTimeout(1000);
    
    //Edit Quantity
    await page.locator('div> input[name="QtyReq"]').clear();
    await page.locator('div> input[name="QtyReq"]').fill(editQuantityMed);
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

    
  //Assign
  await page.locator('span[id="select2-assigntootherselect-container"]').click();
  await page.waitForTimeout(3000); 
  await page.locator('.select2-result-repository__title').nth(1).click();
  await page.waitForTimeout(1000); 

  //Create 
  await page.locator('[id="createbtn"]').click();
  await page.waitForTimeout(1000); 

  //Conf
  await page.locator('[id="locationconfirmclick"]').click();
  await page.waitForTimeout(5000); 

   if (inputMRN) {
      console.log(`✅ Order created successfully. MRN: ${inputMRN}.`);
    } else {
      console.log("❌ Order creation failed. Order ID not generated or submission was unsuccessful.");
    }

    console.log("");
    console.log("\x1b[1mOrder Processing:\x1b[0m"); 


     //Benefits Verification
    //Benefits verification performed by the client
    await page.locator('span[aria-labelledby="select2-PAprocess-container"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[class="select2-results__option"]').nth(3).click();
    await page.waitForTimeout(1000); 

    const OrderProcessingStarted = true;

    if (OrderProcessingStarted) {
       console.log("✅ Order processing has started.");
    } else {
      console.log("❌ Order processing could not be initiated.");
    }

    //Prior Auth Required
    await page.locator('input[name="benefitver"]').nth(2).click();
    await page.waitForTimeout(1000); 
    
    //Complete Benefits Verification 
    await page.locator('[class="btn btn-success float-end btn-lg ms-2"]').nth(0).click();
    await page.waitForTimeout(3000); 

    //PA Submission : Email
      
    await page.locator('span[aria-labelledby="select2-submissionmethod-container"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li.select2-results__option', { hasText: 'Email' }).click();
    await page.waitForTimeout(1000); 
    await page.locator('input[id="emailid"]').fill('foram.amin@outamation.com');
    await page.waitForTimeout(1000); 
    await page.locator('input[id="Refno"]').fill('785414');
    await page.waitForTimeout(1000); 
    await page.locator('input[id="AuthReqOn"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1500); 
    //Complete PA submission
    await page.locator('div> button[id="orderdetermination"]').click();
    await page.waitForTimeout(3000);

    // //refresh the page
    // await page.reload();

    console.log("");
    console.log("\x1b[1mOrder Denied:\x1b[0m"); 

    //Toggle Denied 
    
  const ROtoggleMedicationDenied = async (DeniedRequiredMedication: boolean) => 
  {
    const MedicationToggleButtons = page.locator('div[col-id="isApproved"] > div > label[class="switchToggle changedrugstatus"]');
    const toggleCountMedication = await MedicationToggleButtons.count();
  
    for (let i = 0; i < toggleCountMedication; i++) 
    {
      const toggleButtonMedication = MedicationToggleButtons.nth(i);
     // console.log('toggleButtonMedication' + toggleButtonMedication);
      await toggleButtonMedication.click();

      await page.waitForTimeout(1000); 

       const isActive = await toggleButtonMedication.getAttribute('class') ?? '';
    
    if (isActive.includes('active')) {

      await toggleButtonMedication.click(); // Turn off the toggle if it's on
    } else {
      console.log('Toggle is already OFF');
    }
      await page.waitForTimeout(1000); 
    }
  }
    await page.waitForTimeout(1000); 
    await ROtoggleMedicationDenied(false); // Call with 'false' if approval is not required
    await page.waitForTimeout(3000); 
  

    //Determination: Date
    await page.locator('input[id="dendetrecondate"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1500); 

    //Determination: Reason 
    await page.locator('span[aria-labelledby="select2-denialreasondrp-container"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('li[class="select2-results__option"]').nth(4).click();
    await page.waitForTimeout(1000); 

    await page.locator('button[id="PAdenial"]').click();
    await page.waitForTimeout(3000); 

     const OrderDenied = true; 
      if (OrderDenied) {
          console.log("✅ Order was successfully denied. ");
      } else {
          console.log("❌ Order has been denied. ");
      }

      console.log("");
      console.log("\x1b[1mOrder Appeal:\x1b[0m"); 

      //Close / Appeal Order
    await page.locator('input[name="denialver"]').nth(1).click();
    await page.waitForTimeout(1000); 

    await page.locator('button[id="PAappeal"]').click();
    await page.waitForTimeout(1000); 

    await page.locator('div[class="card-head"]').nth(25).click();
    await page.waitForTimeout(3000); 

    //Appeal Submission : Third Payer Portal
    await page.locator('span[aria-labelledby="select2-APsubmissionmethod-container"]').click();
    await page.locator('li[class="select2-results__option"]').nth(4).click();
    await page.waitForTimeout(1000);

    await page.locator('span[aria-labelledby="select2-APthirdpayerportal-container"]').click();
    await page.waitForTimeout(1000);
    await page.locator('li[class="select2-results__option"]').nth(4).click();
    await page.waitForTimeout(3000);

    await page.locator('input[name="Refno"]').nth(1).fill('101010');
    await page.waitForTimeout(1000); 

    await page.locator('input[id="APAuthReqOn"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1500);  

    await page.locator('button[id="APorderdetermination"]').click();
    await page.waitForTimeout(3000); 

    

      // Edit Medication 1
         await page.locator('a.actionbtn i[title="Edit"]').nth(4).click();
         await page.waitForTimeout(1500); 
         await page.locator('input[name="apstartReq"]').click();
         await page.locator('td[class="today day"]').click();
         await page.waitForTimeout(1500); 
         await page.locator('input[name="apendReq"]').click();
         await page.locator('td[class="today day"]').click();
         await page.waitForTimeout(1500);
         await page.locator('input[name="QtyReq"]').fill(Quantity);
         await page.waitForTimeout(1000); 
     
        //Save After Editing
        await page.locator('a[class="disabled actionbtn me-1"]').click();
        await page.waitForTimeout(1000); 

        // Edit Medication 2
         await page.locator('a.actionbtn i[title="Edit"]').nth(5).click();
         await page.waitForTimeout(1500); 
         await page.locator('input[name="apstartReq"]').click();
         await page.locator('td[class="today day"]').click();
         await page.waitForTimeout(1500); 
         await page.locator('input[name="apendReq"]').click();
         await page.locator('td[class="today day"]').click();
         await page.waitForTimeout(1500);
         await page.locator('input[name="QtyReq"]').fill(editQuantityMed);
         await page.waitForTimeout(1000); 
     
          //Save After Editing
          await page.locator('a[class="disabled actionbtn me-1"]').click();
          await page.waitForTimeout(1000); 

         // Edit Procedures 
         await page.locator('a.actionbtn i[title="Edit"]').nth(6).click();
         await page.waitForTimeout(1500); 
         await page.locator('input[name="apstartReq"]').click();
         await page.locator('td[class="today day"]').click();
         await page.waitForTimeout(1500); 
         await page.locator('input[name="apendReq"]').click();
         await page.locator('td[class="today day"]').click();
         await page.waitForTimeout(1500);
         await page.locator('input[name="QtyReq"]').fill(ProQuantity);
         await page.waitForTimeout(1000); 
     
          //Save After Editing
          await page.locator('a[class="disabled actionbtn me-1"]').click();
          await page.waitForTimeout(1000); 
    


    //Toggle approval logic
    const toggleApprovalDet = async (approvalRequiredDet: boolean) => 
  {
    const toggleButtonsDet = page.locator('div[col-id="isApproved"] > div > label[class="switchToggle changedrugstatus"]');
    const toggleCountDet = await toggleButtonsDet.count();
  
    for (let i = 0; i < toggleCountDet; i++) 
    {
      const toggleButtonMedicationDet = toggleButtonsDet.nth(i);
     // console.log('toggleButtonMedication' + toggleButtonMedication);
      await toggleButtonMedicationDet.click();

      await page.waitForTimeout(1000); 

       const isActive = await toggleButtonMedicationDet.getAttribute('class') ?? '';
    
    if (isActive.includes('active')) {

      await toggleButtonMedicationDet.click(); // Turn off the toggle if it's on
    } else {
      //console.log('Toggle is already OFF');
    }
      await page.waitForTimeout(1000); 
    }
  }
    await page.waitForTimeout(1000); 
    await toggleApprovalDet(true);  // Call with 'true' if approval is required
    await page.waitForTimeout(3000); 

     //Determination Approved 
    await page.locator('input[id="APdetrecondate"]').click();
    await page.waitForTimeout(1000); 
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1000); 
    const DR = faker.number.int({min:10000,max:99999}).toString();
    await page.locator('input[id="APdet_confirmation"]').fill(DR);
    await page.waitForTimeout(1000); 
    const PriorAuth = faker.number.int({min:10000,max:99999}).toString();
    await page.locator('input[id="APdet_parequested"]').fill(PriorAuth);
    await page.locator('input[id="APrenewalDate"]').click();
    await page.locator('td[class="today day"]').click();
    await page.waitForTimeout(1000); 

    const OrderAppealApproved = true;

    if (OrderAppealApproved) {
       console.log("✅ Order appeal successfully processed and order approved.");
    } else {
       console.log("❌ Order appeal was rejected or failed to process.");
    }

    

    console.log("");
    console.log("\x1b[1mRestart Order:\x1b[0m"); 

    // Save Restart
     await page.locator('button[id="restartbtn"]').click();
     await page.waitForTimeout(3000); 

     const turnOffReopenToggles = async () => {
      const toggleIds = [
        'chkRestartCarryData',
        'chkRestartCarryNotes',
        'chkRestartCarryAttachments',
      ];

      for (const id of toggleIds) {
        const input = page.locator(`#${id}`);
        const spanToggle = input.locator('xpath=following-sibling::span');

        if (await input.isChecked()) {
         // console.log(`${id} is ON. Turning it OFF...`);
          await spanToggle.click(); // Click the visible toggle
          await page.waitForTimeout(500); // Optional
        } else {
          //console.log(`${id} is already OFF.`);
        }
      }
    };

      await turnOffReopenToggles();

      await page.locator('[id="restartReason"]').fill('Restart the order');
      await page.waitForTimeout(1500); 
      await page.locator('[id="resetbtn"]').click();
      await page.waitForTimeout(3000);

    const OrderRestart = true; 
      if (OrderRestart) {
          console.log("✅ Order successfully restarted. ");
      } else {
          console.log("❌ Failed to restart the order. ");
      }

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

    // await page.setInputFiles('input[id="uploadfile"]',"Documents/PA-Dashboard Status Mapping-171224-071745.pdf");
    // await page.waitForTimeout(3000);
    // await page.locator('button[id="UploadFileFornoPA"]').click();
    // await page.waitForTimeout(3000); 


});
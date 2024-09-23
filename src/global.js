SSM = require("@aws-sdk/client-ssm");
const parameter_name = "/n11411911/assessment/backend-url";
const client = new SSM.SSMClient({ region: "ap-southeast-2" });

async function func() {
   try {
      response = await client.send(
         new SSM.GetParameterCommand({
            Name: parameter_name
         })
      );

      console.log(response.Parameter.Value);
   } catch (error) {
      console.log(error);
   }
}

func();
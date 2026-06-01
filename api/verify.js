export default async function handler(req,res){

  try{

    const { webhook } = req.body;

    const payload = {
      results:{
        user_hash:"VERIFY_OK",
        captcha:"ok",
        vpn:"no"
      }
    };

    await fetch(webhook,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    });

    res.status(200).json({
      success:true
    });

  }catch(e){

    res.status(500).json({
      success:false
    });

  }

}

const { france } = require('../framework/france');
const s = require('../set')


france(
    {
        nomCom : "setvar",
        categorie : "heroku"
    }, async (dest , zk , commandeOptions) =>{

       const {ms,repondre,superUser , arg} = commandeOptions ;
       
       if(!superUser){repondre('only admin can use this commande');return};
       if(!arg[0] || !(arg.join('').split('='))) {repondre('Bad format ; Exemple of using :\nSetvar OWNER_NAME=Ibrahim Tech');return};
     
    const text = arg.join(" ")
     const Heroku = require("heroku-client");
   
     const heroku = new Heroku({
        token: s.HEROKU_APY_KEY,
      });

     let baseURI = "/apps/" + s.HEROKU_APP_NAME;
        await heroku.patch(baseURI + "/config-vars", {
          body: {
                  [text.split('=')[0]]: text.split('=')[1],
          },
        });
        await repondre('Your update have been set successfully,Wait for 1minute system Updating........')
    }
);

france(
    {
        nomCom : "getallvar",
        categorie : "heroku"
    }, async (dest , zk , commandeOptions) =>{

       const {ms,repondre,superUser , arg} = commandeOptions ;
       
       if(!superUser){repondre('only adamin can use this commande');return}; 
      
            const Heroku = require("heroku-client");

			const heroku = new Heroku({
				token: s.HEROKU_APY_KEY,
			});
			let baseURI = "/apps/" + s.HEROKU_APP_NAME;

            let h = await heroku.get(baseURI+'/config-vars')
let str = '*CMD CAMMAND LIST*\n\n'
for (vr in h) {
str+= '🚘 *'+vr+'* '+'= '+h[vr]+'\n'
}
 repondre(str)


}

);       


    france(
        {
            nomCom : "getvar",
            categorie : "heroku"
        }, async (dest , zk , commandeOptions) =>{
    
           const {ms,repondre,superUser , arg} = commandeOptions ;
           
           if(!superUser){repondre('Only admin can use this command');return}; 
           if(!arg[0]) {repondre('insert the variable name in capital letter'); return} ;
      
           try {
            const Heroku = require("heroku-client");
               
            const heroku = new Heroku({
              token: s.HEROKU_API_KEY,
            });
            let baseURI = "/apps/" + s.HEROKU_APP_NAME;
        let h = await heroku.get(baseURI+'/config-vars')
        for (vr in h) {
        if( arg.join(' ') ===vr ) return  repondre( vr+'= '+h[vr]) 	;
        } 
        
        } catch(e) {repondre('Error' + e)}
   
        });


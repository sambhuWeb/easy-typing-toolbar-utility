# easy-typing-toolbar-utility

# WordProcessor

### Publishing NPM Package

  1. Create & Push Git Tag:
  
         git tag v1.0.0
         git push origin --tags
  
  2. Login to Npm
  
         npm login
         userename: r******
         password: ***
         email: sam***.***.*****@****.com
   
     To Verify if Logged in:
     
         npm whoami 
    
  3. Modify the tag version on package.json as below:
  
         {
           "name": "easy-typing-toolbar-utility",
           "version": "1.0.0",
           ...
         }
         
  4. Publish the package in npm js
  
         npm publish 
         
        Will Give Following output:
        
         npm notice 
         npm notice 📦  easy-typing-toolbar-utility@1.0.0
         npm notice === Tarball Contents === 
         npm notice 767B   package.json
         npm notice 2.3kB  index.js    
         npm notice 1.4kB  README.md   
         npm notice 16.8kB test/test.js
         npm notice === Tarball Details === 
         npm notice name:          easy-typing-toolbar-utility
         npm notice version:       1.0.0                                   
         npm notice package size:  4.1 kB                                  
         npm notice unpacked size: 21.2 kB                                 
         npm notice shasum:        57e02d067884918d114d2ea9a1bdb3cbb19ee3db
         npm notice integrity:     sha512-BrDfNniAQBnB6[...]B1Lo5b05Pn71Q==
         npm notice total files:   4                                       
         npm notice 
         + easy-typing-toolbar-utility@1.0.0
         
 ## Running Test
  
    npm test

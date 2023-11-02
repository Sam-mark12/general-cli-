import prompts from "prompts";
import {readFile,writeFile} from "fs/promises";
async function main(){
      const {items} = await prompts({
        type: 'select',
        name: 'items',
        message: 'Pick a proccess',
        choices: [
          { title: "view all", value : 0 },
          { title: "add new", value: 1},
          { title: "delete", value: 2 },
          { title: "exit", value: 3 }
        ],
        initial: 0
      });

      if(items === 0){
        await viewAll();
      }
      else if(items === 1){
        await addNew();
      }
      else if(items===2){
        await deleteItem();
      }
      else{
        return;
      }
      await main();
      
}
async function viewAll(){
    const data = await readFile("./data.js","utf-8");
    const result = JSON.parse(data);
     for(const i of result){
       console.log(i);
     }
  }
 async function addNew(){
    const {input} = await prompts({
        name:"input",
        type:"text",
        message:"WHAT SHOULD BE ADDED?",
    });
    const data = await readFile("./data.js","utf-8");
    const result = JSON.parse(data);
    result.push(input);
    await writeFile("./data.js", JSON.stringify(result),"utf-8");
  }
  async function deleteItem(){
    const data = await readFile("./data.js","utf-8");
    const result = JSON.parse(data);
    const { choices } = await prompts({
      name:"choices",
      type:"select",
      message:"Select an item to delete",
      choices: result.map((item,index)=> ({title:item,value:index})),
    });
    result.splice(choices,1);
    await writeFile("./data.js", JSON.stringify(result), "utf-8");
  }
main();

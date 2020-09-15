async function exportJson(){
  return $.getJSON('../public/json/noticias.json').done(function( data ) {
    return data;
  });
}

async function formatNotices(){

  let registers = [];
  let notices = await exportJson();
  notices = notices[0]["Editorias"];

  for(const notice of notices){
    for(const noticeObj of notice["Notícias"]){
      registers.push({ 
        category: notice["Editoria"],
        id: notice["Id"],
        data: noticeObj
      });
    }
  }

  return registers;
}

async function loadFilters(){

  let notices = await exportJson();
  notices = notices[0]["Editorias"];

  let categories = [];
  let dates = [];

  for(const notice of notices){
    categories.push({ name: notice["Editoria"], id: notice["Id"]})

    for(const noticeObj of notice["Notícias"]){
      let dateFormat = formatDate(noticeObj["Data de publicação"])
      dates.push(dateFormat)
    
    }
  }

  for(const category of categories){
    let categoryHtml = `
      <option value="${category.id}"> 
        ${category.name} 
      </option>
    `;
    $(categoryHtml).appendTo("#category_filter");
  };

  let orderDates = dates.slice().sort((a, b) => b - a);
  for(const date of orderDates){
    let dateHtml = `
      <option value="${date.toISOString().split('T')[0]}"> 
        ${date.toLocaleDateString()} 
      </option>
    `;
    $(dateHtml).appendTo("#date_filter");
  };
}

async function loadNotices(date = null, category_id = null){

  let registers = await formatNotices()
  let filtredRegisters = null;
  
  if(category_id !== null || date !== null) filtredRegisters = []

  if(category_id !== null && date === null){
    for(const [id, register] of registers.entries()){
      if(register.id === category_id) filtredRegisters.push(register)
    }
  }

  if(date !== null && category_id === null){
    for(const [id, register] of registers.entries()){
      let dateFormated = formatDate(register.data["Data de publicação"]);
      if(new Date(date).getTime() === dateFormated.getTime())
        filtredRegisters.push(register);
    }
  }

  if(date !== null && category_id !== null){
    for(const [id, register] of registers.entries()){
      let dateFormated = formatDate(register.data["Data de publicação"]);
      if(
        new Date(date).getTime() == dateFormated.getTime() && 
        register.id === category_id
      ){
        filtredRegisters.push(register)
      }
    }
  }

  if(filtredRegisters === null) filtredRegisters = registers;
  showNotices(filtredRegisters);

}

function showNotices(registers){
  $(".content-notices ul").empty();
  if(registers){
    for(const register of registers){
      let formatedDate = formatDate(register.data["Data de publicação"]);
      let noticeHtml = `
        <li>
          <div class="box-notice">
            <div class="header">
            <time datetime="${formatedDate.toLocaleDateString()}">
              ${formatedDate.toLocaleDateString()}
            </time>
            <div class="category"> ${register.category} </div>
            </div>
            <figure>
              <img src="../public/notices/${register.data["Foto"]}" 
              alt="${register.data["Título"]}">
            </figure>
            <h3>${register.data["Título"]}</h3>
            <p>${register.data["Texto"]}</p>
            <a href="#">Saiba mais</a>
          </div>
        </li>
      `;

      $(noticeHtml).appendTo(".content-notices ul");
    }
  }
}

function formatDate(date){
  let formmated = date.split('-');
  formmated = formmated[2] + '-' + formmated[1] + '-' + formmated[0];
  return new Date(formmated);
}

$(async function() {
  await loadFilters();
  await loadNotices();

  $("#category_filter, #date_filter").on('change', async (e) => {
    
    let category_id = $("#category_filter").val();
    category_id = category_id !== '' ? category_id : null;

    let date = $("#date_filter").val();
    date = date !== '' ? date : null;
    
    await loadNotices(date, category_id);

  });

});
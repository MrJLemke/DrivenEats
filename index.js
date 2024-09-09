let selectedDish = null;
let selectedDrink = null;
let selectedDessert = null;

// função para selecionar um item 
function selectItem(category, element) {
  if (category === 'dish' && selectedDish) {
      selectedDish.classList.remove('selected');
  } else if (category === 'drink' && selectedDrink) {
      selectedDrink.classList.remove('selected');
  } else if (category === 'dessert' && selectedDessert) {
      selectedDessert.classList.remove('selected');
  }

  // adiciona a classe selected ao novo
  element.classList.add('selected');
  if (category === 'dish') {
      selectedDish = element;
  } else if (category === 'drink') {
      selectedDrink = element;
  } else if (category === 'dessert') {
      selectedDessert = element;
  }

  // atualiza o total
  updateTotal();
}

//  o total do pedido
function updateTotal() {
    let total = 0;

    //  o total apenas dos itens que estiverem selecionados
    if (selectedDish) total += parseFloat(selectedDish.dataset.price);
    if (selectedDrink) total += parseFloat(selectedDrink.dataset.price);
    if (selectedDessert) total += parseFloat(selectedDessert.dataset.price);

    // total no HTML
    const totalPriceElement = document.querySelector('.total-price');
    totalPriceElement.textContent = `Total: R$${total.toFixed(2)}`;

    // habilitar/desabilitar o botão de confirm
    const confirmButton = document.querySelector('.confirm-button');
    if (selectedDish && selectedDrink && selectedDessert) {
        confirmButton.disabled = false;
        confirmButton.classList.add('active');
        confirmButton.textContent = 'Fechar pedido';
    } else {
        confirmButton.disabled = true;
        confirmButton.classList.remove('active');
        confirmButton.innerHTML = `Selecione os 3 itens <br> para fechar o pedido`;
    }
}



// exibir o resumo do pedido
function showOrderSummary() {
    const pedidoModal = document.querySelector('.pedido');
    const selectedItemsElement = document.querySelector('#selected-items');

    // limpa os itens selecionados previamente
    selectedItemsElement.innerHTML = '';

    // adiciona os itens selecionados ao resumo
    if (selectedDish) {
        const dishName = selectedDish.querySelector('h3').textContent;
        const dishPrice = selectedDish.querySelector('.price').textContent;
        selectedItemsElement.innerHTML += `<p> ${dishName} - R$${dishPrice}</p>`;
    }
    if (selectedDrink) {
        const drinkName = selectedDrink.querySelector('h3').textContent;
        const drinkPrice = selectedDrink.querySelector('.price').textContent;
        selectedItemsElement.innerHTML += `<p> ${drinkName} - R$${drinkPrice}</p>`;
    }
    if (selectedDessert) {
        const dessertName = selectedDessert.querySelector('h3').textContent;
        const dessertPrice = selectedDessert.querySelector('.price').textContent;
        selectedItemsElement.innerHTML += `<p> ${dessertName} - R$${dessertPrice}</p>`;
    }

    // modal com o resumo do pedido
    pedidoModal.style.display = 'flex';
}

// fechar o modal de pedido
function closeOrderSummary() {
    const pedidoModal = document.querySelector('.pedido');
    pedidoModal.style.display = 'none';
}

// evento de clique nos itens pratos, bebidas e sobremesas
document.querySelectorAll('.menu-lista-1 .item-card').forEach(item => {
    item.addEventListener('click', () => selectItem('dish', item));
});
document.querySelectorAll('.menu-lista-2 .item-card').forEach(item => {
    item.addEventListener('click', () => selectItem('drink', item));
});
document.querySelectorAll('.menu-lista-3 .item-card').forEach(item => {
    item.addEventListener('click', () => selectItem('dessert', item));
});

// evento de clique no botão de fechar pedido
document.querySelector('.confirm-button').addEventListener('click', () => {
    if (!document.querySelector('.confirm-button').disabled) {
        showOrderSummary();
    }
});

// evento de clique no botão de cancelar pedido
document.querySelector('.cancel-button').addEventListener('click', closeOrderSummary);

// função para confirmar o pedido e enviar para o WhatsApp
function confirmOrder() {
  const total = parseFloat(document.querySelector('.total-price').textContent.replace('Total: R$', ''));
  
  let message = 'Olá, gostaria de fazer o seguinte pedido:\n';

  if (selectedDish) {
      const dishName = selectedDish.querySelector('h3').textContent;
      const dishPrice = selectedDish.querySelector('.price').textContent;
      message += `Prato: ${dishName} - R$${dishPrice}\n`;
  }
  if (selectedDrink) {
      const drinkName = selectedDrink.querySelector('h3').textContent;
      const drinkPrice = selectedDrink.querySelector('.price').textContent;
      message += `Bebida: ${drinkName} - R$${drinkPrice}\n`;
  }
  if (selectedDessert) {
      const dessertName = selectedDessert.querySelector('h3').textContent;
      const dessertPrice = selectedDessert.querySelector('.price').textContent;
      message += `Sobremesa: ${dessertName} - R$${dessertPrice}\n`;
  }

  message += `Total: R$${total.toFixed(2)}`;


  const whatsappUrl = `https://wa.me/5551990149710?text=${encodeURIComponent(message)}`;


  window.open(whatsappUrl, '_blank');
}


document.querySelector('.submit-button').addEventListener('click', confirmOrder);

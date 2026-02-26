// ============ CONTACT ============
function sendMessage(event) {
    event.preventDefault();
    showNotification('Съобщението беше изпратено успешно! Ще ви отговорим скоро.', 'success');
    event.target.reset();
}
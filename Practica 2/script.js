document.getElementById("updatePrices").addEventListener("click", async () => {

    try {

        const button = document.getElementById("updatePrices");

        button.disabled = true;
        button.textContent = "Actualizando...";


        // CONEXIÓN A LA API
        const response = await fetch(
            "https://api.exchangerate-api.com/v4/latest/MXN"
        );

        // COMPROBAR SI LA RESPUESTA FUE CORRECTA
        if (!response.ok) {
            throw new Error("No se pudo obtener el tipo de cambio");
        }

        const data = await response.json();


        // OBTENER TIPOS DE CAMBIO
        const usdRate = data.rates.USD;
        const yenRate = data.rates.JPY;


        // ACTUALIZAR PRECIOS EN DÓLARES
        document.querySelectorAll(".price-usd").forEach(priceElement => {

            const mxnValue = parseFloat(
                priceElement.dataset.mxn
            );

            const usdValue = (
                mxnValue * usdRate
            ).toFixed(2);

            priceElement.textContent =
                "$" + usdValue + " USD";

        });


        // ACTUALIZAR PRECIOS EN YENES
        document.querySelectorAll(".price-jpy").forEach(priceElement => {

            const mxnValue = parseFloat(
                priceElement.dataset.mxn
            );

            const yenValue = (
                mxnValue * yenRate
            ).toFixed(0);

            priceElement.textContent =
                "¥" + yenValue;

        });


        // RESTAURAR BOTÓN
        button.disabled = false;
        button.textContent = "🔄 Actualizar Precios";


    } catch (error) {

        // MOSTRAR ERROR
        alert("Error al actualizar precios. Intenta nuevamente.");

        console.error(error);


        // RESTAURAR BOTÓN
        const button = document.getElementById("updatePrices");

        button.disabled = false;
        button.textContent = "🔄 Actualizar Precios";

    }

});

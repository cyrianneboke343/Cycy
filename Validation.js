document.addEventListener("DOMContentLoaded", () => {
  const formulairePaiement = document.getElementById("formulaire-paiement")

  if (formulairePaiement) {
    const champMatricule = document.getElementById("matricule")
    const champMontant = document.getElementById("montant")

    if (champMatricule) {
      champMatricule.addEventListener("input", function () {
        const valeur = this.value.toUpperCase()
        this.value = valeur

        const regex = /^(SI|SE|DR|ME)\d{6}$/
        const estValide = regex.test(valeur)

        if (valeur.length > 0 && !estValide) {
          this.style.borderColor = "#ef4444"
          this.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)"
          afficherErreurMatricule("Format invalide (ex: SI123456)")
        } else {
          this.style.borderColor = estValide ? "#10b981" : "#e5e7eb"
          this.style.boxShadow = estValide ? "0 0 0 3px rgba(16, 185, 129, 0.1)" : "none"
          masquerErreurMatricule()
        }
      })
    }

    if (champMontant) {
      champMontant.addEventListener("input", function () {
        if (this.value < 0) {
          this.value = 0
        }
      })
    }

    formulairePaiement.addEventListener("submit", (e) => {
      const erreurs = []

      const matricule = champMatricule.value
      const montant = Number.parseFloat(champMontant.value)

      if (!/^(SI|SE|DR|ME)\d{6}$/.test(matricule)) {
        erreurs.push("Format matricule invalide")
      }

      if (montant <= 0) {
        erreurs.push("Le montant doit être supérieur à 0")
      }

      if (erreurs.length > 0) {
        e.preventDefault()
        alert("Erreurs:\n" + erreurs.join("\n"))
      }
    })
  }

  function afficherErreurMatricule(message) {
    masquerErreurMatricule()
    const erreur = document.createElement("div")
    erreur.className = "erreur-validation"
    erreur.style.color = "#ef4444"
    erreur.style.fontSize = "0.85rem"
    erreur.style.marginTop = "0.5rem"
    erreur.style.fontWeight = "500"
    erreur.textContent = message
    document.getElementById("matricule").parentNode.appendChild(erreur)
  }

  function masquerErreurMatricule() {
    const erreur = document.querySelector("#matricule + .erreur-validation, #matricule ~ .erreur-validation")
    if (erreur) {
      erreur.remove()
    }
  }

  const tableaux = document.querySelectorAll(".tableau-responsive")
  tableaux.forEach((tableau) => {
    if (tableau.scrollWidth > tableau.clientWidth) {
      tableau.style.boxShadow = "inset -10px 0 10px -10px rgba(0,0,0,0.1)"
    }
  })
})

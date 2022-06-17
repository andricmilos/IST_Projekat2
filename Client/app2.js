var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:5292/api/Preduzece/ukupanBrojPreduzeca",
    "method": "GET"
};
var RadSaPrikazom = /** @class */ (function () {
    function RadSaPrikazom() {
    }
    RadSaPrikazom.prikaziDetaljePreduzeca = function (timovi) {
        var prikaz = "";
        timovi.forEach(function (t) {
            prikaz += "<div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"flush-headingOne-tim-".concat(t.pib, "\">\n              <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseOne-tim-").concat(t.pib, "\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne-tim-").concat(t.pib, "\">\n                ").concat(t.naziv, "\n              </button>\n            </h2>\n            <div id=\"flush-collapseOne-tim-").concat(t.pib, "\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne-tim-").concat(t.pib, "\" data-bs-parent=\"#accordionFlushExample\">\n            <ul>\n                <li>Odgovorno Lice: ").concat(t.ime, " ").concat(t.prezime, "</li>\n                <li>Adresa: ").concat(t.adresa, "</li>\n                <li>Email: ").concat(t.email, "</li>\n                <li>Pib: ").concat(t.pib, "</li>\n            </ul> \n            <div id=\"ovdeforma-").concat(t.pib, "\"></div>\n            <button onclick=\"IzmeniPreduzece.izmeniPreduzece('").concat(t.ime, "','").concat(t.prezime, "','").concat(t.email, "','").concat(t.naziv, "','").concat(t.adresa, "','").concat(t.pib, "')\">Izmeni</button>\n            <button onclick=\"RadSaPrikazom.listajFaktureZa('").concat(t.pib, "')\">Prikazi fakture za preduzece</button>\n            <div id=\"ovdelistaFak-").concat(t.pib, "\"></div>\n            </div>\n          </div>");
        });
        return prikaz;
    };
    RadSaPrikazom.prikaziDetaljeFaktura = function (timovi) {
        var prikaz = "";
        timovi.forEach(function (t) {
            prikaz += "<div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"flush-headingOne-tim-".concat(t.id, "\">\n              <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseOne-tim-").concat(t.id, "\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne-tim-").concat(t.id, "\">\n                ").concat(t.naziv, "\n              </button>\n            </h2>\n            <div id=\"flush-collapseOne-tim-").concat(t.id, "\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne-tim-").concat(t.id, "\" data-bs-parent=\"#accordionFlushExample\">\n            <ul>\n                <li>Id: ").concat(t.id, "</li>\n                <li>Pib: ").concat(t.pib, "</li>\n                <li>Pib primaoca fakture: ").concat(t.pib2, "</li>\n                <li>Datum: ").concat(t.datumGenerisanja, "</li>\n                <li>Datum Uplate: ").concat(t.datumPlacanja, "</li>\n                <li>Cena: ").concat(t.ukupnaCena, "</li>\n                <li>Tip: ").concat(t.tipFakture, "</li>\n            </ul> \n          \n            </div>\n          </div>");
        });
        return prikaz;
    };
    RadSaPrikazom.listajFaktureZa = function (pib) {
        settings.url = "http://localhost:5292/api/Faktura/".concat(pib, "/0");
        $.ajax(settings).done(function (response) {
            document.getElementById("ovdelistaFak-" + pib).innerHTML = "\n        <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">".concat(RadSaPrikazom.prikaziDetaljeFaktura(response), "</div>\n        ");
        });
    };
    RadSaPrikazom.prikaziPreduzeca = function (div) {
        settings.url = "http://localhost:5292/api/Preduzece/ukupanBrojPreduzeca";
        var timovi = [];
        $.ajax(settings).done(function (response) {
            div.innerHTML = "\n        <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">".concat(RadSaPrikazom.prikaziDetaljePreduzeca(response), "</div>\n        ");
        });
    };
    RadSaPrikazom.prikaziFakture = function (pib, page) {
        var div = document.getElementById("ovdelistaFak-" + pib);
        settings.url = "http://localhost:5292/api/Faktura/sveFakture/".concat(page);
        div.innerHTML = "";
        $.ajax(settings).done(function (response) {
            response.data.forEach(function (i) {
                div.innerHTML += "<p>".concat(i.pib, " ").concat(i.pib2, " - ").concat(i.naziv, "</p>");
            });
            div.innerHTML += "<ul class=\"pagination\">\n            <li class=\"page-item\"><a class=\"page-link\" id=\"previous_page\" data-page=".concat(response.meta.current_page - 1, ">Previous</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" id=\"next_page\" data-page=").concat(response.meta.next_page, ">Next</a></li>\n          </ul>");
            document.querySelector("#previous_page").addEventListener("click", function () {
                var page = parseInt(document.querySelector("#previous_page").getAttribute("data-page"));
                if (page < 0) {
                    page = 0;
                }
                RadSaPrikazom.prikaziFakture(document.querySelector("#fakture"), page);
            });
            document.querySelector("#next_page").addEventListener("click", function () {
                var page = parseInt(document.querySelector("#next_page").getAttribute("data-page"));
                RadSaPrikazom.prikaziFakture(document.querySelector("#fakture"), page);
            });
        });
    };
    return RadSaPrikazom;
}());
var DodajPreduzece = /** @class */ (function () {
    function DodajPreduzece() {
    }
    DodajPreduzece.dodajPreduzece = function () {
        document.getElementById("dodavanjePreduzeca").innerHTML = "<form id=\"postForm\" class=\"editForm\" action=\"http://localhost:5292/api/Preduzece/dodajPreduzece\" method=\"post\">\n        Ime: <input type=\"text\" name=\"ime\"><br>\n        Prezime: <input type=\"text\" name=\"prezime\"><br>\n        Email: <input type=\"email\" name=\"email\"><br>\n        Naziv preduzeca: <input type=\"text\" name=\"naziv\"><br>\n        Adresa: <input type=\"text\" name=\"adresa\"><br>\n        PIB: <input type=\"number\" name=\"PIB\"><br>\n        <button  type=\"submit\" >Dodaj</button>\n        </form>";
        /*
          $("#postForm").submit((e) => {
          e.preventDefault();
          $.ajax({
          url: "http://localhost:5292/api/Preduzece/ukupanBrojPreduzeca",
          type: "post",
          data: $("#postForm").serialize(),
          success: () => {
              alert("Izmenjeno Preduzece sa pibom " + broj + "!")
          }
      });
      })    */
    };
    return DodajPreduzece;
}());
var IzmeniPreduzece = /** @class */ (function () {
    function IzmeniPreduzece() {
    }
    IzmeniPreduzece.izmeniPreduzece = function (ime, prezime, email, naziv, adresa, pib) {
        document.getElementById("ovdeforma-" + pib).innerHTML = "<form action=\"http://localhost:5292/api/Preduzece/izmeniPreduzece\" method=\"post\">\n        Ime: <input type=\"text\" name=\"ime\" value=\"".concat(ime, "\"><br>\n        Prezime: <input type=\"text\" name=\"prezime\" value=\"").concat(prezime, "\"><br>\n        Email: <input type=\"email\" name=\"email\" value=\"").concat(email, "\"><br>\n        Naziv preduzeca: <input type=\"text\" name=\"naziv\" value=\"").concat(naziv, "\"><br>\n        Adresa: <input type=\"text\" name=\"adresa\" value=\"").concat(adresa, "\"><br>\n        PIB: <input type=\"number\" name=\"PIB\" value=\"").concat(pib, "\"><br>\n        <input type=\"hidden\" name=\"PIBstari\" value=\"").concat(pib, "\">\n        <button type=\"submit\" name=\"\">Saqcuvaj Izmene</button>\n    </form><br>");
    };
    return IzmeniPreduzece;
}());
//RadSaPrikazom.prikaziPreduzeca(document.querySelector("#timovi"));
//RadSaPrikazom.prikaziFakture(,0);
var dugme = document.getElementById("dugme");
dugme.addEventListener('click', function (e) { return RadSaPrikazom.prikaziPreduzeca(document.querySelector("#preduzeca")); });
var dugmee = document.getElementById("dodajPreduzece");
dugmee.addEventListener('click', function (e) { return DodajPreduzece.dodajPreduzece(); });

# TattooProj

Tetoválás időpont foglaló oldal, amin a regisztrált felhasználók más funkciók mellett időpontot tudnak foglalni tetoválásra.

## Funkciók és belépés
A belépésre 3 mód áll rendelkezésre: admin, regisztrált felhasználó és vendég.
Az admin felületre való belépéshez az "admin@mail.com | admin1" páros szükséges.
A regisztrált felhasználók foglalhatnak időpontot, egy árkalkulátor segítségével kiszámolhatják, mennyibe fog kerülni a tetoválásuk valamint kommentelhetnek.
A vendégek nem tudnak időpontot foglalni.
Az admin felület kiegészül egy plusz füllel ahol listázva vannak a foglalások, valamint ezeket tudja kezelni.

## Help for pontozás

Adatmodell definiálása (legalább 4 TypeScript interfész vagy class formájában (ugyanennyi kollekció))
: /shared/models Book.ts, Comment.ts, User.ts --> 4 interfész, kollekció

Alkalmazás felbontása megfelelő számú komponensre (egyetlen komponens TS és HTML kódja sem haladja meg a 250 sort és soronként a 400 karaktert)
: a landing css kivételével egyik sem haladja meg, a landing css alja 375 sor, de szerintem érthető :"D

Reszponzív, mobile-first felület (minden adat látható és jól jelenik meg böngészőben is, mobil nézetben is)
: minden is látható

Legalább 2 különböző attribútum direktíva használata
: [ngStyle] -> nac.component.html
: [(ngModel)] -> calculator.component.html, 

Legalább 2 különböző strukturális direktíva használata
: *ngFor -> booking.component.html
: *ngIf -> book.component.html, comments.component.html, landing.component.html, nav.component.html

Adatátadás szülő és gyermek komponensek között (legalább 1 @Input és 1 @Output)
: @Input -> nincs
: @Output -> calculator.component.ts

Legalább 10 különböző Material elem helyes használata.
: minden input app.component.ts-ben van (van egypár)

Adatbevitel Angular form-ok segítségével megvalósítva (legalább 2)
: landingon 2-is, booging.component, comment.component

Legalább 1 saját Pipe osztály írása és használata
: van, de nincs használva

Legalább 2 különböző Lifecycle Hook használata a teljes projektben (értelmes tartalommal, nem üresen)
: onInit -> kb mindenhol

CRUD műveletek mindegyike megvalósult (Promise, Observable használattal)
: kiv módosítás

CRUD műveletek service-ekbe vannak kiszervezve és megfelelő módon injektálva lettek
: servicek

Firestore adatbázis használata az adatokhoz (integráció, környezeti változók használata helyes legyen)
: user.service.ts, auth.service.ts, booking.service.ts, comment.service.ts

Legalább 2 komplex Firestore lekérdezés megvalósítása (ide tartoznak: where feltétel, rendezés, léptetés, limitálás)
: nincs

Legalább 4 különböző route a különböző oldalak eléréséhez
: app-routing.module.ts -> landing, dashboard, book, bookings, comment, not-found, calculator, '', **

Legalább 2 route levédése azonosítással (AuthGuard) (ahol ennek értelme van, pl.: egy fórum témakör megtekinthető bárki számára, de a regisztrált felhasználó adatai nem)
: a book van levédve

Szubjektív pontozás a projekt egészére vonatkozólag (mennyire fedi le a projekt a témakört (mennyire kapcsolódik hozzá), mennyi lehet a befektetett energia a projektben)
: ki nem kérne időpontot ezen az oldalon? :D

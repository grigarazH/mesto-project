(()=>{"use strict";var e,t,r,n=document.querySelector(".popup_type_photo"),o=document.querySelector(".popup_type_add-card"),c=document.querySelector(".popup_type_edit-profile"),a=document.querySelector(".popup_type_update_avatar"),u=document.querySelector(".popup_type_delete_card"),i=n.querySelector(".popup__photo"),l=n.querySelector(".popup__photo-caption"),s=c.querySelector(".popup__container"),d=o.querySelector(".popup__container"),p=a.querySelector(".popup__container"),f=u.querySelector(".popup__container"),_={editProfilePopup:c,addCardPopup:o,photoPopup:n,updateAvatarPopup:a,deleteCardPopup:u},m=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");v(t)}},y=function(e){e.classList.add("popup_opened"),document.addEventListener("keydown",m)},v=function(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",m)},h={baseUrl:"https://mesto.nomoreparties.co/v1/plus-cohort-6",headers:{authorization:"8d39c875-e0dc-4420-9d25-ae2d27971d79","Content-type":"application/json"}},b=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},S={formSelector:".popup__container_type_form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_active"},C=document.querySelector(".profile__name"),g=document.querySelector(".profile__subtitle"),q=document.querySelector(".profile__avatar"),E=function(t){e=t,C.textContent=e.name,g.textContent=e.about,q.src=e.avatar},P=function(){return r},k=function(){return t},O=document.querySelector(".cards"),L=function(t){var o=document.querySelector("#card_template").content.firstElementChild.cloneNode(!0),c=o.querySelector(".card__image"),a=o.querySelector(".card__image-container"),u=o.querySelector(".card__title"),s=o.querySelector(".card__like-amount");c.src=t.link,c.alt="Фотография места ".concat(t.name),s.textContent=t.likes.length,a.addEventListener("click",(function(){return function(e){i.src=e.link,i.alt=e.name,l.textContent=e.name,y(n)}(t)}));var d=o.querySelector(".card__like-button");d.addEventListener("click",(function(){j(d,t,s)}));var p=o.querySelector(".card__delete-button");return p.addEventListener("click",(function(){var e;e=t._id,r=e,y(_.deleteCardPopup)})),t.owner._id===e._id?p.classList.remove("card__delete-button_hidden"):p.classList.add("card__delete-button_hidden"),u.textContent=t.name,o},j=function(e,t,r){var n;e.classList.contains("card__like-button_active")?function(e){return fetch("".concat(h.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:h.headers}).then((function(e){return b(e)}))}(t._id).then((function(t){r.textContent=t.likes.length,e.classList.remove("card__like-button_active")})).catch((function(e){return console.log(e)})):(n=t._id,fetch("".concat(h.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:h.headers}).then((function(e){return b(e)}))).then((function(t){r.textContent=t.likes.length,e.classList.add("card__like-button_active")})).catch((function(e){return console.log(e)}))},x=["inputErrorClass","errorClass"],A=["inputErrorClass","errorClass"],w=["inputSelector","submitButtonSelector"],U=["inputSelector","submitButtonSelector"],D=["formSelector"];function T(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function B(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function I(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var N=function(e,t,r){t.validity.valid?function(e,t,r){var n=r.inputErrorClass,o=r.errorClass,c=(I(r,A),e.querySelector(".".concat(t.id,"-error")));t.classList.remove(n),c.classList.remove(o),c.textContent=""}(e,t,r):function(e,t,r,n){var o=n.inputErrorClass,c=n.errorClass,a=(I(n,x),e.querySelector(".".concat(t.id,"-error")));t.classList.add(o),a.textContent=r,a.classList.add(c)}(e,t,t.validationMessage,r)},J=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.disabled=!1:t.disabled=!0},H=function(e,t){var r=t.inputSelector,n=t.submitButtonSelector,o=I(t,U),c=Array.from(e.querySelectorAll(r)),a=e.querySelector(n);c.forEach((function(t){N(e,t,o),J(c,a)}))};function M(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var z=document.querySelector(".profile__edit-button"),$=document.querySelector(".profile__add-button"),F=document.querySelector(".profile__avatar-button"),G=s.elements["edit-profile-name"],K=s.elements["edit-profile-subtitle"],Q=s.querySelector(".popup__submit"),R=_.addCardPopup.querySelector(".popup__submit"),V=_.updateAvatarPopup.querySelector(".popup__submit"),W=p.elements["update-avatar-link"],X=d.elements["add-card-name"],Y=d.elements["add-card-link"];z.addEventListener("click",(function(){Q.textContent="Сохранить",y(_.editProfilePopup),G.value=C.textContent,K.value=g.textContent,H(s,S)})),s.addEventListener("submit",(function(e){var t,r;e.preventDefault(),Q.textContent="Сохранение...",(t=G.value,r=K.value,fetch("".concat(h.baseUrl,"/users/me"),{method:"PATCH",headers:h.headers,body:JSON.stringify({name:t,about:r})}).then((function(e){return b(e)}))).then((function(e){E(e),v(_.editProfilePopup)})).catch((function(e){return console.log(e)}))})),$.addEventListener("click",(function(){R.textContent="Сохранить",y(_.addCardPopup)})),d.addEventListener("submit",(function(e){e.preventDefault();var t,r,n,o={name:X.value,link:Y.value};R.textContent="Сохранение...",(t=o,r=t.name,n=t.link,fetch("".concat(h.baseUrl,"/cards"),{method:"POST",headers:h.headers,body:JSON.stringify({name:r,link:n})}).then((function(e){return b(e)}))).then((function(e){var t=L(e);O.prepend(t),k().unshift(e),d.reset(),H(d,S),v(_.addCardPopup)})).catch((function(e){return console.log(e)}))})),f.addEventListener("submit",(function(e){var t;e.preventDefault(),(t=P(),fetch("".concat(h.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:h.headers}).then((function(e){return b(e)}))).then((function(){Array.from(O.querySelectorAll(".card"))[k().findIndex((function(e){return e._id===P()}))].remove(),v(_.deleteCardPopup)})).catch((function(e){return console.log(e)}))})),Object.keys(_).forEach((function(e){_[e].addEventListener("mousedown",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close-button"))&&v(_[e])}))})),F.addEventListener("click",(function(){V.textContent="Сохранить",y(_.updateAvatarPopup),W.value=q.src,H(p,S)})),p.addEventListener("submit",(function(e){var t;e.preventDefault(),V.textContent="Сохранение...",(t=W.value,fetch("".concat(h.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:h.headers,body:JSON.stringify({avatar:t})}).then((function(e){return b(e)}))).then((function(e){E(e),v(_.updateAvatarPopup)})).catch((function(e){return console.log(e)}))})),function(e){var t=e.formSelector,r=I(e,D);Array.from(document.querySelectorAll(t)).forEach((function(e){return function(e,t){var r=t.inputSelector,n=t.submitButtonSelector,o=I(t,w),c=Array.from(e.querySelectorAll(r)),a=e.querySelector(n);J(c,a),c.forEach((function(t){t.addEventListener("input",(function(){N(e,t,o),J(c,a)}))}))}(e,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?T(Object(r),!0).forEach((function(t){B(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):T(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({formSelector:t},r))}))}(S),Promise.all([fetch("".concat(h.baseUrl,"/users/me"),{headers:h.headers}).then((function(e){return b(e)})),fetch("".concat(h.baseUrl,"/cards"),{headers:h.headers}).then((function(e){return b(e)}))]).then((function(r){var n,o,c=(o=2,function(e){if(Array.isArray(e))return e}(n=r)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c=[],a=!0,u=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(c.push(n.value),!t||c.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(u)throw o}}return c}}(n,o)||function(e,t){if(e){if("string"==typeof e)return M(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?M(e,t):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],u=c[1];E(a),function(r){console.log("setting cards"),O.textContent="",(t=r).forEach((function(t){var r=O.appendChild(L(t)).querySelector(".card__like-button");t.likes.some((function(t){return t._id===e._id}))?r.classList.add("card__like-button_active"):r.classList.remove("card__like-button_active")}))}(u)})).catch((function(e){return console.log(e)}))})();
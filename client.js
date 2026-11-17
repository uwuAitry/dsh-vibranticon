// client.js — vibranticon: the living-icon motion layer and its Settings page.
// No gallery: product icons animate on hover across the app; this plugin only
// registers one Settings section (a switch per preference) plus the motion layer.
window.__ModuleLoader__.load({
  id: 'dsh-vibranticon',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useEffect, useState } = React;

    // ---- icon data (generated from iconpack/data.js by gen-icons.mjs) ----
    const ICONS = [{"key":"search","file":"SearchOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M6.58727 11.8586C9.55061 11.8586 11.9529 9.45637 11.9529 6.49304C11.9529 3.5297 9.55061 1.12744 6.58727 1.12744C3.62394 1.12744 1.22168 3.5297 1.22168 6.49304C1.22168 9.45637 3.62394 11.8586 6.58727 11.8586Z","stroke":"currentColor"},{"t":"path","d":"M10.2991 10.3933L14.7783 14.8725","stroke":"currentColor"}],"motion":"orbit","cfg":{"period":1500,"rot":true}},{"key":"send","file":"SendOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M6.97211 1.94476C7.55785 1.35914 8.50767 1.35919 9.09343 1.94476L13.921 6.77228L13.2138 7.47939L8.38632 2.65187C8.19108 2.45682 7.87443 2.45677 7.67922 2.65187L2.74397 7.58711L2.03687 6.88L6.97211 1.94476Z","fill":"currentColor"},{"t":"path","d":"M7.97571 14.5732L8.02421 2.34139","stroke":"currentColor"}],"motion":"drift","cfg":{"period":1500,"ty":-2.5}},{"key":"newchat","file":"NewChatOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M2.37091 11.2501C1.58745 9.89288 1.32067 8.29835 1.61969 6.76006C1.91872 5.22177 2.76342 3.8433 3.99826 2.87846C5.2331 1.91362 6.77494 1.42737 8.33988 1.50925C9.90482 1.59113 11.3875 2.23562 12.5149 3.32406C13.6425 4.41269 14.3387 5.87206 14.4754 7.4334C14.612 8.99474 14.18 10.5529 13.2587 11.8209C12.3375 13.0888 10.9891 13.9813 9.46194 14.3337C8.18691 14.628 6.85895 14.5294 5.64989 14.0605C5.1712 13.8748 4.76962 13.4932 4.26534 13.3967C3.67413 13.2835 2.95257 13.5598 2.03794 14.3337","stroke":"currentColor"},{"t":"path","d":"M8 5V11","stroke":"currentColor"},{"t":"path","d":"M5 8H11","stroke":"currentColor"}],"motion":"sway","cfg":{"period":1500,"deg":8}},{"key":"refresh","file":"RefreshOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M14.5001 8C14.5 9.28552 14.1188 10.5422 13.4045 11.611C12.6903 12.6799 11.6752 13.5129 10.4875 14.0049C9.29982 14.4968 7.99295 14.6255 6.73212 14.3747C5.4713 14.124 4.31314 13.505 3.4041 12.596C2.49514 11.687 1.87614 10.5288 1.62537 9.26798C1.37459 8.00716 1.50331 6.70028 1.99525 5.51261C2.48719 4.32494 3.32025 3.30981 4.3891 2.59557C5.45795 1.88134 6.71458 1.50008 8.0001 1.5C9.9001 1.5 11.7001 2.3 13.0001 3.6L14.5001 5.1","stroke":"currentColor"},{"t":"path","d":"M14.4999 1.5V5.1H10.8999","stroke":"currentColor"}],"motion":"spin","cfg":{"period":1500,"deg":360,"nl":true,"rot":true}},{"key":"trash","file":"TrashOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M1.28149 3.88831H14.7187","stroke":"currentColor"},{"t":"path","d":"M5.41602 3.88833V2.47962C5.41602 2.29282 5.52492 2.11366 5.71876 1.98157C5.9126 1.84948 6.17551 1.77527 6.44964 1.77527H9.55053C9.82466 1.77527 10.0876 1.84948 10.2814 1.98157C10.4753 2.11366 10.5842 2.29282 10.5842 2.47962V3.88833","stroke":"currentColor"},{"t":"path","d":"M2.57349 3.88831L3.19366 13.2943C3.21937 13.5502 3.33952 13.7872 3.53065 13.9593C3.72178 14.1313 3.97016 14.2259 4.22729 14.2246H11.7728C12.0299 14.2259 12.2783 14.1313 12.4694 13.9593C12.6605 13.7872 12.7807 13.5502 12.8064 13.2943L13.4266 3.88831","stroke":"currentColor"},{"t":"path","d":"M6.44946 6.98926V11.1238","stroke":"currentColor"},{"t":"path","d":"M9.55054 6.98926V11.1238","stroke":"currentColor"}],"motion":"lid","cfg":{"period":1500}},{"key":"copy","file":"CopyOutline","vb":"0 0 16 16","paths":[{"t":"rect","x":"1.52075","y":"4.07373","w":"10.3932","h":"10.3932","rx":"2","stroke":"currentColor"},{"t":"path","d":"M11.9792 1.53296C13.36 1.53296 14.4792 2.65225 14.4792 4.03296V9.42847C14.4792 10.3756 13.9521 11.1987 13.1755 11.6228V10.3298C13.3652 10.0787 13.4792 9.7674 13.4792 9.42847V4.03296C13.4792 3.20453 12.8077 2.53296 11.9792 2.53296H6.58374C6.27966 2.53301 5.99684 2.6235 5.7605 2.77905H4.42358C4.85652 2.03463 5.66056 1.53304 6.58374 1.53296H11.9792Z","fill":"currentColor"}],"motion":"peel","cfg":{"period":1500,"tx":2,"ty":-2}},{"key":"check","file":"CheckOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M2.25 8.5L5.49732 11.7473C5.90519 12.1552 6.57263 12.1344 6.95426 11.7018L13.75 4","stroke":"currentColor"}],"motion":"drawloop","cfg":{"period":1200}},{"key":"close","file":"CloseOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M2.5 2.5L13.5 13.5","stroke":"currentColor"},{"t":"path","d":"M13.5 2.5L2.5 13.5","stroke":"currentColor"}],"motion":"press","cfg":{"period":1500,"scale":0.9}},{"key":"plus","file":"PlusOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M8 2V14","stroke":"currentColor"},{"t":"path","d":"M2 8H14","stroke":"currentColor"}],"motion":"spin","cfg":{"period":2000,"deg":90,"back":true,"rot":true}},{"key":"think","file":"ThinkOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M10.2854 5.71481C12.9673 8.39663 14.1182 11.5938 12.8562 12.8559C11.5942 14.1179 8.39706 12.9669 5.71518 10.2851C3.03333 7.60323 1.88236 4.40608 3.14441 3.14403C4.40644 1.882 7.6036 3.03297 10.2854 5.71481Z","stroke":"currentColor"},{"t":"path","d":"M10.2854 10.2851C7.6036 12.9669 4.40644 14.1179 3.14441 12.8559C1.88236 11.5938 3.03333 8.39663 5.71518 5.71481C8.39706 3.03297 11.5942 1.882 12.8562 3.14403C14.1182 4.40608 12.9673 7.60323 10.2854 10.2851Z","stroke":"currentColor"},{"t":"path","d":"M8.86291 8.0002C8.86291 8.47549 8.47762 8.86087 8.00224 8.86087C7.52694 8.86087 7.1416 8.47549 7.1416 8.0002C7.1416 7.52485 7.52694 7.13953 8.00224 7.13953C8.47762 7.13953 8.86291 7.52485 8.86291 8.0002Z","fill":"currentColor"}],"motion":"atom","cfg":{"period":2000}},{"key":"sparkle","file":"Sparkle","vb":"0 0 16 16","paths":[{"t":"path","d":"M5.875 3C5.875 6.33333 7.54167 8 10.875 8C7.54167 8 5.875 9.66667 5.875 13C5.875 9.66667 4.20833 8 0.875 8C4.20833 8 5.875 6.33333 5.875 3Z","stroke":"currentColor"},{"t":"path","d":"M12.375 1.55823C12.375 3.39156 13.2917 4.30823 15.125 4.30823C13.2917 4.30823 12.375 5.22489 12.375 7.05823C12.375 5.22489 11.4583 4.30823 9.625 4.30823C11.4583 4.30823 12.375 3.39156 12.375 1.55823Z","stroke":"currentColor"},{"t":"path","d":"M12.375 10.4418C12.375 11.7751 13.0417 12.4418 14.375 12.4418C13.0417 12.4418 12.375 13.1084 12.375 14.4418C12.375 13.1084 11.7083 12.4418 10.375 12.4418C11.7083 12.4418 12.375 11.7751 12.375 10.4418Z","stroke":"currentColor"}],"motion":"twinkle","cfg":{"period":1500,"rot":true,"parts":true}},{"key":"loading","file":"LoadingOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M12.596 12.596C11.687 13.5049 10.5288 14.1239 9.26798 14.3747C8.00716 14.6255 6.70028 14.4968 5.51261 14.0048C4.32494 13.5129 3.30981 12.6798 2.59557 11.611C1.88134 10.5421 1.50008 9.2855 1.5 7.99998C1.50008 6.71446 1.88134 5.45783 2.59557 4.38898C3.30981 3.32013 4.32494 2.48707 5.51261 1.99513C6.70028 1.50319 8.00716 1.37447 9.26798 1.62524C10.5288 1.87602 11.687 2.49502 12.596 3.40398","stroke":"currentColor"}],"motion":"spin","cfg":{"period":1000,"deg":360,"nl":true,"rot":true}},{"key":"play","file":"PlayOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z","stroke":"currentColor"},{"t":"path","d":"M10.3329 7.91346C10.3996 7.95195 10.3996 8.04818 10.3329 8.08667L6.78304 10.1362C6.71638 10.1747 6.63304 10.1266 6.63304 10.0496L6.63304 5.95055C6.63304 5.87357 6.71638 5.82546 6.78304 5.86395L10.3329 7.91346Z","stroke":"currentColor"}],"motion":"press","cfg":{"period":1500,"scale":0.88}},{"key":"pause","file":"PauseOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z","stroke":"currentColor"},{"t":"path","d":"M6.5 5V11","stroke":"currentColor"},{"t":"path","d":"M9.5 5V11","stroke":"currentColor"}],"motion":"press","cfg":{"period":1500,"scale":0.86}},{"key":"mic","file":"MicrophoneOutline","vb":"0 0 16 16","paths":[{"t":"rect","x":"5","y":"1.5","w":"6","h":"9","rx":"3","stroke":"currentColor"},{"t":"path","d":"M2.35 8.675C3.075 11.3 5.2 13.125 8 13.125C10.8 13.125 12.925 11.3 13.65 8.675M8 13.125V15","stroke":"currentColor"}],"motion":"nod","cfg":{"period":1500,"ty":-2,"rot":false}},{"key":"paperclip","file":"PaperclipOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M12.75 4.5V9.5C12.75 10.7598 12.2496 11.968 11.3588 12.8588C10.468 13.7496 9.25978 14.25 8 14.25C6.74022 14.25 5.53204 13.7496 4.64124 12.8588C3.75045 11.968 3.25 10.7598 3.25 9.5V5C3.25 4.13805 3.59241 3.3114 4.2019 2.7019C4.8114 2.09241 5.63805 1.75 6.5 1.75C7.36195 1.75 8.1886 2.09241 8.7981 2.7019C9.40759 3.3114 9.75 4.13805 9.75 5V9.5C9.75 9.96413 9.56563 10.4092 9.23744 10.7374C8.90925 11.0656 8.46413 11.25 8 11.25C7.53587 11.25 7.09075 11.0656 6.76256 10.7374C6.43437 10.4092 6.25 9.96413 6.25 9.5V5.5","stroke":"currentColor"}],"motion":"peel","cfg":{"period":1500,"deg":-20}},{"key":"shield","file":"ShieldOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M6.80132 2.14853C7.70663 1.80917 8.70422 1.80919 9.60952 2.14859L14.1296 3.84317V7.11961C14.1296 11.6089 10.7615 13.5975 8.20543 14.5779C5.64931 13.5975 2.28052 11.6089 2.28052 7.11961V3.84317L6.80132 2.14853Z","stroke":"currentColor"}],"motion":"breathe","cfg":{"period":2000,"scale":0.94}},{"key":"folder","file":"FolderOpenOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M12.3994 13.5986H2.04956C1.49728 13.5986 1.04956 13.1509 1.04956 12.5986V3.40137C1.04956 2.84908 1.49728 2.40137 2.04956 2.40137H4.76632C5.01016 2.40137 5.24561 2.49046 5.42836 2.6519L6.94088 3.98799C7.12364 4.14943 7.35908 4.23852 7.60293 4.23852H12.3994C12.9517 4.23852 13.3994 4.68624 13.3994 5.23852V7.16991","stroke":"currentColor"},{"t":"path","d":"M2.55911 7.93683C2.67584 7.49906 3.07229 7.19446 3.52536 7.19446H13.6491C14.3061 7.19446 14.7846 7.81725 14.6153 8.45209L13.4411 12.856C13.3244 13.2938 12.9279 13.5984 12.4748 13.5984H2.35113C1.69411 13.5984 1.21562 12.9756 1.38489 12.3407L2.55911 7.93683Z","stroke":"currentColor"}],"motion":"foldertip","cfg":{"period":2000}},{"key":"panelleft","file":"PanelLeftOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M13.5 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V13.5C1.5 14.0523 1.94772 14.5 2.5 14.5H13.5C14.0523 14.5 14.5 14.0523 14.5 13.5V2.5C14.5 1.94772 14.0523 1.5 13.5 1.5Z","stroke":"currentColor"},{"t":"path","d":"M5.5 1.5V14.5","stroke":"currentColor"}],"motion":"drift","cfg":{"period":1500,"tx":2.5}},{"key":"settings","file":"PersonalizationOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M3.25 7.16357C3.20417 7.32247 3.17778 7.48993 3.17773 7.66357C3.17773 7.83698 3.20336 8.00486 3.24902 8.16357H1.85742V7.16357H3.25ZM14.1426 8.16357H6.71484C6.76052 8.00485 6.78613 7.837 6.78613 7.66357C6.78609 7.48991 6.75971 7.32249 6.71387 7.16357H14.1426V8.16357Z","fill":"currentColor"},{"t":"path","d":"M9.1377 11.9092C9.08596 12.0666 9.05668 12.2344 9.05664 12.4092C9.05664 12.5838 9.08606 12.7518 9.1377 12.9092H1.85742V11.9092H9.1377ZM14.1426 12.9092H12.1816C12.2332 12.7519 12.2617 12.5838 12.2617 12.4092C12.2617 12.2345 12.2333 12.0666 12.1816 11.9092H14.1426V12.9092Z","fill":"currentColor"},{"t":"path","d":"M9.1123 3.09106C9.06138 3.24865 9.03324 3.41653 9.0332 3.59106C9.0332 3.76549 9.06148 3.93355 9.1123 4.09106H1.85742V3.09106H9.1123ZM14.1426 4.09106H12.207C12.2578 3.93358 12.2861 3.76545 12.2861 3.59106C12.2861 3.41657 12.2579 3.24862 12.207 3.09106H14.1426V4.09106Z","fill":"currentColor"},{"t":"circle","cx":"4.97065","cy":"7.66401","r":"1.35151","stroke":"currentColor"},{"t":"circle","cx":"10.6596","cy":"12.4091","r":"1.35151","stroke":"currentColor"},{"t":"circle","cx":"10.6596","cy":"3.59101","r":"1.35151","stroke":"currentColor"}],"motion":"sliders","cfg":{"period":1500}},{"key":"database","file":"DatabaseOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M13.1967 5.1869C13.7232 4.77378 14.0003 4.30517 14.0001 3.82819C14.0003 3.3512 13.7232 2.88259 13.1967 2.46947C12.6702 2.05635 11.9128 1.71328 11.0006 1.47475C10.0885 1.23621 9.05371 1.11062 8.00039 1.1106C6.94707 1.11057 5.9123 1.23612 5.00009 1.47461C4.08742 1.71301 3.32948 2.05604 2.80249 2.46919C2.2755 2.88235 1.99805 3.35106 1.99805 3.82819C1.99805 4.30531 2.2755 4.77402 2.80249 5.18718C3.32948 5.60033 4.08742 5.94336 5.00009 6.18176C5.9123 6.42025 6.94707 6.5458 8.00039 6.54578C9.05371 6.54575 10.0885 6.42016 11.0006 6.18163C11.9128 5.94309 12.6702 5.60002 13.1967 5.1869Z","stroke":"currentColor"},{"t":"path","d":"M2 3.80371V11.7848","stroke":"currentColor"},{"t":"path","d":"M14 3.80371V11.7848","stroke":"currentColor"},{"t":"path","d":"M2 7.81396C2 8.60524 2.63214 9.36411 3.75736 9.92363C4.88258 10.4832 6.4087 10.7975 8 10.7975C9.5913 10.7975 11.1174 10.4832 12.2426 9.92363C13.3679 9.36411 14 8.60524 14 7.81396","stroke":"currentColor"},{"t":"path","d":"M2 11.7847C2 12.6081 2.63214 13.3977 3.75736 13.98C4.88258 14.5622 6.4087 14.8893 8 14.8893C9.5913 14.8893 11.1174 14.5622 12.2426 13.98C13.3679 13.3977 14 12.6081 14 11.7847","stroke":"currentColor"}],"motion":"scan","cfg":{"period":1500,"ty":2.5}},{"key":"link","file":"LinkOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M6.59961 9.40051C6.82779 9.6334 7.10015 9.81842 7.40074 9.94472C7.70132 10.071 8.02409 10.1361 8.35013 10.1361C8.67618 10.1361 8.99894 10.071 9.29953 9.94472C9.60011 9.81842 9.87247 9.6334 10.1007 9.40051L12.9015 6.59967C13.3658 6.13541 13.6266 5.50572 13.6266 4.84915C13.6266 4.19258 13.3658 3.56289 12.9015 3.09863C12.4372 2.63436 11.8075 2.37354 11.151 2.37354C10.4944 2.37354 9.86472 2.63436 9.40045 3.09863L9.05034 3.44873","stroke":"currentColor"},{"t":"path","d":"M9.40051 6.59959C9.17233 6.3667 8.89997 6.18169 8.59939 6.05538C8.2988 5.92907 7.97603 5.86401 7.64999 5.86401C7.32395 5.86401 7.00118 5.92907 6.70059 6.05538C6.40001 6.18169 6.12765 6.3667 5.89946 6.59959L3.09863 9.40043C2.63436 9.8647 2.37354 10.4944 2.37354 11.151C2.37354 11.8075 2.63436 12.4372 3.09863 12.9015C3.56289 13.3657 4.19258 13.6266 4.84915 13.6266C5.50572 13.6266 6.13541 13.3657 6.59967 12.9015L6.94978 12.5514","stroke":"currentColor"}],"motion":"breathe","cfg":{"period":1500,"scale":0.92}},{"key":"goal","file":"GoalOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M14.5001 8C14.5 9.28552 14.1188 10.5422 13.4045 11.611C12.6903 12.6799 11.6752 13.5129 10.4875 14.0049C9.29982 14.4968 7.99295 14.6255 6.73212 14.3747C5.4713 14.124 4.31314 13.505 3.4041 12.596C2.49514 11.687 1.87614 10.5288 1.62537 9.26798C1.37459 8.00716 1.50331 6.70028 1.99525 5.51261C2.48719 4.32494 3.32025 3.30981 4.3891 2.59557C5.45795 1.88134 6.71458 1.50008 8.0001 1.5","stroke":"currentColor"},{"t":"path","d":"M11.5 8C11.5001 8.69227 11.2948 9.36901 10.9102 9.94463C10.5257 10.5202 9.97901 10.9689 9.33944 11.2338C8.69986 11.4987 7.99609 11.5681 7.31712 11.433C6.63816 11.2979 6.01449 10.9645 5.52501 10.475C5.03548 9.98552 4.70209 9.36185 4.56702 8.68289C4.43195 8.00392 4.50127 7.30015 4.76619 6.66057C5.03112 6.021 5.47976 5.47436 6.05538 5.08978C6.631 4.70519 7.30774 4.49995 8.00001 4.5","stroke":"currentColor"},{"t":"path","d":"M8.00024 7.99976L11.2 4.80005","stroke":"currentColor"},{"t":"path","d":"M12.4719 5.62245C12.4246 5.66972 12.3569 5.69025 12.2913 5.67715L10.7814 5.37555C10.7022 5.35972 10.6402 5.29781 10.6244 5.2186L10.3228 3.70866C10.3097 3.6431 10.3302 3.57533 10.3775 3.52806L12.1826 1.723C12.2863 1.61929 12.4627 1.65879 12.5122 1.79684L12.9271 2.95225C12.9472 3.00847 12.9915 3.05272 13.0477 3.07291L14.2031 3.48774C14.3412 3.5373 14.3807 3.71368 14.277 3.81739L12.4719 5.62245Z","stroke":"currentColor"}],"motion":"pulse","cfg":{"period":1500,"scale":1.1}},{"key":"inspect","file":"InspectOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M4.67398 4.25061L1.36094 7.86484C1.29085 7.9413 1.29085 8.05866 1.36094 8.13513L4.67398 11.7494","stroke":"currentColor"},{"t":"path","d":"M11.3262 4.25061L14.6392 7.86484C14.7093 7.9413 14.7093 8.05866 14.6392 8.13513L11.3262 11.7494","stroke":"currentColor"},{"t":"path","d":"M9.56222 3.62573L6.43774 12.3743","stroke":"currentColor"}],"motion":"brackets","cfg":{"period":1500}},{"key":"deliverdoc","file":"DeliverDoc","vb":"0 0 16 16","paths":[{"t":"path","d":"M6.15479 4.91687H9.84543","stroke":"currentColor"},{"t":"path","d":"M11.8798 9.55347V2.71525C11.8798 2.37416 11.564 2.09766 11.1744 2.09766H4.82577C4.43618 2.09766 4.12036 2.37416 4.12036 2.71525V9.55347","stroke":"currentColor"},{"t":"path","d":"M2.28735 13.8022V8.84792C2.28735 8.77514 2.36262 8.72673 2.42884 8.75693L13.2936 13.7112C13.3914 13.7558 13.3596 13.9022 13.2521 13.9022H2.38735C2.33213 13.9022 2.28735 13.8575 2.28735 13.8022Z","stroke":"currentColor"},{"t":"path","d":"M7.46929 10.979L13.5783 8.7416C13.6435 8.7177 13.7126 8.76601 13.7126 8.83551L13.7125 13.8022C13.7125 13.8574 13.6678 13.9022 13.6125 13.9022H7.99999","stroke":"currentColor"},{"t":"path","d":"M6.15479 7.2395H9.05644","stroke":"currentColor"}],"motion":"drift","cfg":{"period":2000,"tx":4}},{"key":"globe","file":"GlobeOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M7.99986 14.0887C11.3626 14.0887 14.0886 11.3627 14.0886 7.99998C14.0886 4.63727 11.3626 1.91125 7.99986 1.91125C4.63715 1.91125 1.91113 4.63727 1.91113 7.99998C1.91113 11.3627 4.63715 14.0887 7.99986 14.0887Z","stroke":"currentColor"},{"t":"path","d":"M2.34619 8H13.6538","stroke":"currentColor"},{"t":"path","d":"M7.99976 14.0889C9.23509 14.0889 10.1743 11.3629 10.1743 8.00006C10.1743 4.63739 9.23509 1.91138 7.99976 1.91138","stroke":"currentColor"},{"t":"path","d":"M7.99973 14.0889C6.76445 14.0889 5.8252 11.3629 5.8252 8.00006C5.8252 4.63739 6.76445 1.91138 7.99973 1.91138","stroke":"currentColor"}],"motion":"breathe","cfg":{"period":3000,"scale":0.95}},{"key":"users","file":"UsersOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M6 8.25C7.51878 8.25 8.75 7.01878 8.75 5.5C8.75 3.98122 7.51878 2.75 6 2.75C4.48122 2.75 3.25 3.98122 3.25 5.5C3.25 7.01878 4.48122 8.25 6 8.25Z","stroke":"currentColor"},{"t":"path","d":"M1 14.5C1 11.5 3.5 10.25 6 10.25C8.5 10.25 11 11.5 11 14.5","stroke":"currentColor"},{"t":"path","d":"M10.5 2.9C11.65 3.35 12.45 4.35 12.45 5.5C12.45 6.65 11.65 7.65 10.5 8.1","stroke":"currentColor"},{"t":"path","d":"M12.4 10.6C13.9 11.3 15 12.6 15 14.5","stroke":"currentColor"}],"motion":"breathe","cfg":{"period":2000,"scale":0.93}},{"key":"plugin","file":"PluginPinwheelOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M7.84457 5.06199C11.6605 4.93876 14.7962 6.14848 14.8484 7.76397C14.8875 8.97461 13.1838 10.0696 10.7215 10.5942","stroke":"currentColor"},{"t":"path","d":"M5.12742 8.07731C5.00419 4.26138 6.21391 1.12568 7.8294 1.07351C9.04004 1.03441 10.135 2.73808 10.6596 5.20037","stroke":"currentColor"},{"t":"path","d":"M8.02457 10.6802C4.20865 10.8034 1.07294 9.5937 1.02077 7.97821C0.981678 6.76758 2.68535 5.67262 5.14763 5.14798","stroke":"currentColor"},{"t":"path","d":"M10.7476 7.89535C10.8708 11.7113 9.66109 14.847 8.0456 14.8991C6.83496 14.9382 5.74 13.2346 5.21536 10.7723","stroke":"currentColor"}],"motion":"spin","cfg":{"period":2000,"deg":360,"rot":true}},{"key":"plan","file":"PlanOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M4.9375 5.90295H11.0625","stroke":"currentColor"},{"t":"path","d":"M4.9375 9.02991H8.27841","stroke":"currentColor"},{"t":"path","d":"M12.5 1.32617C13.3039 1.32617 14 1.95171 14 2.77637V7.61328L13 8.68164V2.77637C13 2.55186 12.8007 2.32617 12.5 2.32617H3.5C3.1993 2.32617 3 2.55186 3 2.77637V13.2246C3.00044 13.4489 3.19963 13.6738 3.5 13.6738H8.32812L7.39258 14.6738H3.5C2.69637 14.6738 2.00042 14.0489 2 13.2246V2.77637C2 1.95171 2.69613 1.32617 3.5 1.32617H12.5Z","fill":"currentColor"},{"t":"path","d":"M8.97212 14.3693C9.17511 14.5723 9.37811 14.7753 9.5811 14.9783C9.67012 14.8953 9.75914 14.8123 9.84815 14.7293C11.4505 13.2352 13.0528 11.7411 14.6551 10.247C14.7441 10.164 14.8331 10.081 14.9221 9.99803C14.5989 9.6748 14.2756 9.35157 13.9524 9.02834C13.8694 9.11736 13.7864 9.20637 13.7034 9.29539C12.2093 10.8977 10.7152 12.5 9.22113 14.1023C9.13813 14.1913 9.05513 14.2803 8.97212 14.3693Z","fill":"currentColor"},{"t":"path","d":"M11.6323 13.7841C11.6323 14.0395 11.6323 14.295 11.6323 14.5504C11.6812 14.5523 11.7301 14.5543 11.779 14.5562C12.659 14.5913 13.539 14.6263 14.419 14.6614C14.4679 14.6633 14.5168 14.6653 14.5657 14.6672C14.5657 14.3339 14.5657 14.0006 14.5657 13.6672C14.5168 13.6692 14.4679 13.6711 14.419 13.6731C13.539 13.7081 12.659 13.7432 11.779 13.7783C11.7301 13.7802 11.6812 13.7821 11.6323 13.7841Z","fill":"currentColor"}],"motion":"drawloop","cfg":{"period":2500}},{"key":"edit","file":"EditOutline","vb":"0 0 16 16","paths":[{"t":"path","d":"M8.85596 2.69971H4.19971C3.37141 2.69971 2.69992 3.37146 2.69971 4.19971V11.8003C2.69992 12.6285 3.37141 13.3003 4.19971 13.3003H11.8003C12.6283 13.2999 13.3001 12.6283 13.3003 11.8003V7.89893H14.3003V11.8003C14.3001 13.1806 13.1806 14.2999 11.8003 14.3003H4.19971C2.81913 14.3003 1.69992 13.1808 1.69971 11.8003V4.19971C1.69992 2.81918 2.81913 1.69971 4.19971 1.69971H8.85596V2.69971Z","fill":"currentColor"},{"t":"path","d":"M7.7849 8.23878L13.888 2.13574","stroke":"currentColor"}],"motion":"drift","cfg":{"period":1500,"tx":1.5,"ty":-1.5}},{"key":"skill","file":"SkillOutline","vb":"0 0 17 17","paths":[{"t":"path","d":"M4.57788 5.77124H10.7029","stroke":"currentColor"},{"t":"path","d":"M4.57788 8.89819H7.91879","stroke":"currentColor"},{"t":"path","d":"M12.1404 1.19446C12.9442 1.19446 13.6404 1.81999 13.6404 2.64465V8.89856H12.6404V2.64465C12.6404 2.42015 12.4411 2.19446 12.1404 2.19446H3.14038C2.83968 2.19446 2.64038 2.42015 2.64038 2.64465V13.0929C2.64082 13.3172 2.84001 13.5421 3.14038 13.5421H8.88159V14.5421H3.14038C2.33675 14.5421 1.6408 13.9172 1.64038 13.0929V2.64465C1.64038 1.81999 2.33651 1.19446 3.14038 1.19446H12.1404Z","fill":"currentColor"},{"t":"path","d":"M12.0051 15.1056C12.0051 13.6395 10.8166 12.451 9.35059 12.451C10.8166 12.451 12.0051 11.2626 12.0051 9.79651C12.0051 11.2626 13.1936 12.451 14.6597 12.451C13.1936 12.451 12.0051 13.6395 12.0051 15.1056Z","stroke":"currentColor"}],"motion":"sway","cfg":{"period":1500,"deg":8,"rot":true}},{"key":"stop","file":"StopFill","vb":"0 0 16 16","paths":[{"t":"path","d":"M12.5 2.5H3.5C2.94772 2.5 2.5 2.94772 2.5 3.5V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V3.5C13.5 2.94772 13.0523 2.5 12.5 2.5Z","fill":"currentColor"}],"motion":"press","cfg":{"period":1200,"scale":0.88}}];
    const REPLACEMENTS = null;

    const NS = 'vibranticon';
    const zh = {
      'settings.title': '灵动图标',
      'settings.desc': '界面图标在鼠标悬停时播放一次贴合语义的短动效；静止时零动画。',
      'settings.hover': '界面图标动效',
      'settings.hover.desc': '悬停产品或导航图标时播放一次动效，移开即回到静止。',
      'settings.thinking': '思考图标持续旋转',
      'settings.thinking.desc': '模型正在推理时，「思考」图标持续缓慢自转，推理结束即停。',
    };
    const en = {
      'settings.title': 'Living icons',
      'settings.desc': 'UI icons play one short semantic motion on hover; idle icons never animate.',
      'settings.hover': 'Icon motion on hover',
      'settings.hover.desc': 'Play one motion when hovering a product or navigation icon; it settles when the pointer leaves.',
      'settings.thinking': 'Spin the thinking icon',
      'settings.thinking.desc': 'Rotate the thinking icon slowly while the model is reasoning, and stop when it finishes.',
    };

    // ---- preferences (per browser, persisted in localStorage) ----
    const PREF_KEY = 'vibranticon/prefs';
    const PREFS = { hover: true, thinking: true };
    try {
      const saved = JSON.parse((window.localStorage && window.localStorage.getItem(PREF_KEY)) || 'null');
      if (saved && typeof saved === 'object') {
        if (typeof saved.hover === 'boolean') PREFS.hover = saved.hover;
        if (typeof saved.thinking === 'boolean') PREFS.thinking = saved.thinking;
      }
    } catch (e) { /* storage unavailable: keep defaults */ }
    const prefSubs = new Set();
    let liveStyle = null;
    let resetAllMotions = () => {};
    function syncPrefs() {
      if (liveStyle) liveStyle.textContent = PREFS.thinking ? vicLiveCss() : '';
      if (!PREFS.hover) resetAllMotions();
    }
    function setPref(key, value) {
      if (PREFS[key] === value) return;
      PREFS[key] = value;
      try { window.localStorage && window.localStorage.setItem(PREF_KEY, JSON.stringify(PREFS)); } catch (e) { /* ignore */ }
      syncPrefs();
      for (const sub of prefSubs) sub();
    }
    function usePrefs() {
      const [snap, setSnap] = useState(() => ({ ...PREFS }));
      useEffect(() => {
        const read = () => setSnap({ ...PREFS });
        prefSubs.add(read);
        return () => { prefSubs.delete(read); };
      }, []);
      return snap;
    }

    // 仅鼠标悬停时播放一次的图标动效层（纯 CSS：空闲零动画、几乎零开销；大量图标也不影响性能）。
    // 作用对象是宿主每个图标 svg[data-icon="dsw-icon-<glyph>-<weight>"]。
    // 官方 sprite id 形如 dsw-icon-<glyph>-<weight>，glyph 保留 -outline / -fill 后缀：
    // RefreshOutline → refresh-outline、StopFill → stop-fill、Sparkle → sparkle。
    const VIC_GLYPH = rec => {
      const m = /(Outline|Fill)$/.exec(rec.file);
      const base = rec.file.replace(/(Outline|Fill)$/, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      return m ? base + '-' + m[1].toLowerCase() : base;
    };
    const VIC_ANIM = { spin: 'vic-spin', press: 'vic-press', pulse: 'vic-pop', breathe: 'vic-breathe', twinkle: 'vic-twinkle', bob: 'vic-up', nod: 'vic-down', drift: 'vic-right', scan: 'vic-down', sway: 'vic-sway', lid: 'vic-lid', flap: 'vic-up', foldertip: 'vic-up', peel: 'vic-up', orbit: 'vic-orbit', drawloop: 'vic-pop', atom: 'vic-orbit', sliders: 'vic-left', brackets: 'vic-brackets', flip: 'vic-pop' };
    const VIC_KEY_ANIM = { plus: 'vic-spin90', send: 'vic-up', mic: 'vic-up', settings: 'vic-left', globe: 'vic-breathe', search: 'vic-orbit', check: 'vic-pop', plan: 'vic-pop' };
    const VIC_ANIM_BY_GLYPH = (() => { const m = {}; for (const rec of ICONS) { const g = VIC_GLYPH(rec); m[g] = VIC_KEY_ANIM[rec.key] || VIC_ANIM[rec.motion] || 'vic-pop'; } return m; })();
    // ---- 图标动效状态机（Web Animations API）----
    // 每个动作都是「初始 → 末态」的单向关键帧：正序 = play()，反向 = playbackRate=-1，
    // 因此可中途打断、可反向且无跳变；未选中离开→反向回初始，选中→停在末态保持。
    const VIC_MOTION_DEFS = {
      'vic-spin': { kf: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(90deg)' }], dur: 480 },
      'vic-spin90': { kf: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(90deg)' }], dur: 480 },
      'vic-press': { kf: [{ transform: 'scale(1)' }, { transform: 'scale(0.88)' }], dur: 260 },
      'vic-pop': { kf: [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }], dur: 320 },
      'vic-breathe': { kf: [{ transform: 'scale(1)' }, { transform: 'scale(0.9)' }], dur: 420 },
      'vic-up': { kf: [{ transform: 'translateY(0)' }, { transform: 'translateY(-2px)' }], dur: 260 },
      'vic-down': { kf: [{ transform: 'translateY(0)' }, { transform: 'translateY(2px)' }], dur: 260 },
      'vic-left': { kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(-2px)' }], dur: 260 },
      'vic-right': { kf: [{ transform: 'translateX(0)' }, { transform: 'translateX(2px)' }], dur: 260 },
      'vic-sway': { kf: [{ transform: 'rotate(0deg)' }, { transform: 'rotate(-7deg)' }], dur: 360 },
      'vic-lid': { kf: [{ transform: 'translateY(0)' }, { transform: 'translateY(-2.4px)' }], dur: 300 },
      'vic-twinkle': { kf: [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0.82)', opacity: 0.45 }], dur: 360 },
      'vic-orbit': { kf: [{ transform: 'translate(0,0)' }, { transform: 'translate(1.4px,0)' }], dur: 360 },
      'vic-brackets': { kf: [{ transform: 'translateY(0)' }, { transform: 'translateY(1.8px)' }], dur: 360 },
    };
    // 仅“正在思考”的图标持续旋转（原子轨道转≈电子绕行）：只看流式中的思考行 / 过程头 activity=thinking；
    // 历史/已完成的思考行 data-state=ok，不会动——避免列表里一堆图标一直转。
    const VIC_LIVE = '[data-state="running"] svg[data-icon^="dsw-icon-think-outline"],'
      + '[data-process-activity="thinking"] svg[data-icon^="dsw-icon-think-outline"]{'
      + 'transform-box:fill-box;transform-origin:center;animation:vic-think 2.4s linear infinite}';
    function vicLiveCss() {
      return '@media (prefers-reduced-motion: no-preference){'
        + '@keyframes vic-think{to{transform:rotate(360deg)}}'
        + VIC_LIVE + '}';
    }
    function installLiveCss(ctx) {
      ctx.effect(() => {
        const el = document.createElement('style');
        el.setAttribute('data-vibranticon', '');
        liveStyle = el;
        el.textContent = PREFS.thinking ? vicLiveCss() : '';
        document.head.appendChild(el);
        return () => { liveStyle = null; el.remove(); };
      }, 'vibranticon: live icon css');
    }
    function installIconMotion(ctx) {
      ctx.effect(() => {
        const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const states = new WeakMap();
        const tracked = new Set();
        const hostOf = svg => svg.closest('button, a, [role="tab"], [role="menuitem"], [aria-selected], [aria-current], [data-active]');
        const isSelected = host => !!host && (
          host.getAttribute('aria-selected') === 'true' ||
          host.getAttribute('aria-current') === 'true' || host.hasAttribute('aria-current') ||
          host.getAttribute('data-active') === 'true' ||
          /(^|[\s_-])(active|selected|current)([\s_-]|$)/.test(host.className || '')
        );
        const svgOf = ev => {
          const t = ev.target;
          if (!t || !t.closest) return null;
          const direct = t.closest('svg[data-icon]');
          if (direct) return direct;
          // 图标常设 pointer-events:none，事件目标可能是外层按钮：回退到宿主内的第一个图标
          const host = t.closest('button, a, [role="tab"], [role="menuitem"], [aria-selected], [aria-current], [data-active]');
          return host ? host.querySelector('svg[data-icon]') : null;
        };
        const defOf = svg => {
          const m = /^dsw-icon-(.+)-(?:regular|medium)$/.exec(svg.getAttribute('data-icon') || '');
          const name = m && VIC_ANIM_BY_GLYPH[m[1]];
          return name ? VIC_MOTION_DEFS[name] : null;
        };
        const ensure = svg => {
          let st = states.get(svg);
          if (st) return st;
          const def = defOf(svg);
          if (!def) return null;
          svg.style.transformBox = 'fill-box';
          svg.style.transformOrigin = 'center';
          const anim = svg.animate(def.kf, { duration: def.dur, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'both' });
          anim.pause(); anim.currentTime = 0;
          st = { anim, def, selected: false, reversing: false, timer: null };
          anim.onfinish = () => { if (st.reversing) { st.reversing = false; anim.cancel(); } };
          states.set(svg, st);
          tracked.add(svg);
          return st;
        };
        const forward = svg => {
          const st = ensure(svg); if (!st) return;
          st.reversing = false;
          clearTimeout(st.timer);
          const a = st.anim;
          if (a.playState === 'idle' || (a.playbackRate > 0 && a.playState === 'finished')) a.currentTime = 0;
          a.playbackRate = 1;
          a.play();
        };
        const reverse = svg => {
          const st = states.get(svg); if (!st) return;
          st.reversing = true;
          clearTimeout(st.timer);
          const a = st.anim;
          if (a.playbackRate < 0 && a.playState === 'running') return; // 已在反向
          a.playbackRate = -1;
          a.play();
        };
        const reset = svg => { const st = states.get(svg); if (!st) return; st.reversing = false; clearTimeout(st.timer); st.anim.cancel(); };
        resetAllMotions = () => { for (const svg of tracked) { const st = states.get(svg); if (st) { clearTimeout(st.timer); st.anim.cancel(); } } };
        const syncSelection = () => {
          for (const svg of tracked) {
            if (!svg.isConnected) { tracked.delete(svg); states.delete(svg); continue; }
            const st = states.get(svg); if (!st) continue;
            const sel = isSelected(hostOf(svg));
            if (sel && !st.selected) { st.selected = true; forward(svg); }
            else if (!sel && st.selected) { st.selected = false; reverse(svg); }
          }
        };
        const onOver = ev => {
          const svg = svgOf(ev); if (!svg) return;
          if (!PREFS.hover || reduce()) { reset(svg); return; }
          const st = ensure(svg); if (!st) return;
          st.selected = isSelected(hostOf(svg));
          forward(svg);
        };
        const onOut = ev => {
          const svg = svgOf(ev); if (!svg) return;
          if (ev.relatedTarget && svg.contains(ev.relatedTarget)) return;
          const st = states.get(svg); if (!st) return;
          if (!PREFS.hover || reduce()) { reset(svg); return; }
          if (isSelected(hostOf(svg))) { st.selected = true; return; }
          st.selected = false;
          reverse(svg);
        };
        const onClick = ev => {
          const svg = svgOf(ev); if (!svg) return;
          if (!PREFS.hover || reduce()) return;
          const st = ensure(svg); if (!st) return;
          const sel = isSelected(hostOf(svg));
          st.selected = sel;
          forward(svg);
          if (!sel) st.timer = setTimeout(() => { const cur = states.get(svg); if (cur && !cur.selected) reverse(svg); }, st.def.dur + 140);
          setTimeout(syncSelection, 0);
          setTimeout(syncSelection, 180);
        };
        const mo = new MutationObserver(syncSelection);
        mo.observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['aria-selected', 'aria-current', 'data-active', 'data-state'] });
        document.addEventListener('pointerover', onOver, true);
        document.addEventListener('pointerout', onOut, true);
        document.addEventListener('click', onClick, true);
        return () => {
          document.removeEventListener('pointerover', onOver, true);
          document.removeEventListener('pointerout', onOut, true);
          document.removeEventListener('click', onClick, true);
          mo.disconnect();
          for (const svg of tracked) { const st = states.get(svg); if (st) { clearTimeout(st.timer); st.anim.cancel(); } }
          tracked.clear();
          resetAllMotions = () => {};
        };
      }, 'vibranticon: icon motion');
    }

    const SETTINGS_CSS = [
      '.vic-prefs { display: flex; flex-direction: column; padding: 4px 0; }',
      '.vic-prefs-title { font-size: 14px; font-weight: 600; color: var(--dsw-alias-label-primary); }',
      '.vic-prefs-desc { margin: 3px 0 10px; font-size: 12px; line-height: 1.5; color: var(--dsw-alias-label-secondary); }',
      '.vic-pref { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--dsw-alias-border-l2); }',
      '.vic-pref:last-child { border-bottom: none; padding-bottom: 0; }',
      '.vic-pref-label { font-size: 13px; color: var(--dsw-alias-label-primary); }',
      '.vic-pref-note { margin-top: 3px; font-size: 11px; line-height: 1.5; color: var(--dsw-alias-label-tertiary); }',
      '.vic-switch { flex: none; position: relative; width: 34px; height: 20px; padding: 0; border-radius: 999px; cursor: pointer;',
      '  border: 1px solid var(--dsw-alias-border-l2); background: var(--dsw-alias-bg-layer-1);',
      '  transition: background 150ms cubic-bezier(.4,0,.2,1), border-color 150ms cubic-bezier(.4,0,.2,1); }',
      '.vic-switch::after { content: ""; position: absolute; top: 50%; left: 2px; width: 14px; height: 14px; margin-top: -7px; border-radius: 50%;',
      '  background: var(--dsw-alias-label-secondary); transition: transform 150ms cubic-bezier(.4,0,.2,1), background 150ms; }',
      '.vic-switch[aria-checked="true"] { background: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); }',
      '.vic-switch[aria-checked="true"]::after { transform: translateX(14px); background: #fff; }',
      '.vic-switch:focus-visible { outline: 1px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }',
      '@media (prefers-reduced-motion: reduce) { .vic-switch, .vic-switch::after { transition: none; } }',
    ].join('\n');

    function PrefRow({ label, note, checked, onChange }) {
      return h('div', { className: 'vic-pref' },
        h('div', null,
          h('div', { className: 'vic-pref-label' }, label),
          note ? h('div', { className: 'vic-pref-note' }, note) : null),
        h('button', {
          type: 'button',
          role: 'switch',
          className: 'vic-switch',
          'aria-checked': checked ? 'true' : 'false',
          'aria-label': label,
          onClick: () => onChange(!checked),
        }));
    }

    function IconSettingsSection(props) {
      const t = props.t || (k => zh[k]);
      const prefs = usePrefs();
      return h('div', { className: 'vic-prefs' },
        h('style', null, SETTINGS_CSS),
        h('div', { className: 'vic-prefs-title' }, t('settings.title')),
        h('div', { className: 'vic-prefs-desc' }, t('settings.desc')),
        h(PrefRow, { label: t('settings.hover'), note: t('settings.hover.desc'), checked: prefs.hover, onChange: v => setPref('hover', v) }),
        h(PrefRow, { label: t('settings.thinking'), note: t('settings.thinking.desc'), checked: prefs.thinking, onChange: v => setPref('thinking', v) }));
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'vibranticon: dictionaries');
        const t = ctx.locale.bind(NS);
        installLiveCss(ctx);
        installIconMotion(ctx);
        syncPrefs();
        // Registers only a Settings section; there is no gallery tab.
        ctx.slots.inject('settings.section', () => ctx.slots.register({
          name: 'settings.section',
          id: 'vibranticon',
          order: 50,
          locale: NS,
          label: () => t('settings.title'),
        }, IconSettingsSection));
      },
    };
  },
});

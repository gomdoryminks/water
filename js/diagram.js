$(function() {
    $.fn.setDiagramList = function(option) {
        var $this = $(this);
        var $ul = $("<ul class='diagram-list'></ul>");
        var _direction = option.direction;
        var _data = option.data;
        var _reData = {};
        
        function createDiagram(jsonData,$parentObj) {
            for (var key3 in jsonData) {
                createDiagramItem(jsonData[key3],$parentObj);
            }
        }
        
        function createDiagramItem(jsonData,$parentObj) {
            var $li = $("<li></li>");
            var itemKey = (jsonData.itemKey != undefined ? jsonData.itemKey : "");
            var itemBoxCnt = 1;
            var itemHtml = "";
            
            //itemBox 개수 조회
            if (jsonData.itemBox != undefined) {
                itemBoxCnt = jsonData.itemBox.length;
            }
            
            itemHtml += "<div class='diagram-item" + (itemBoxCnt > 1 ? " many-diagram-item" : "") + "' data-item-key='" + itemKey + "'>\n";
            
            //itemBox 내용 설정
            for (var key4 in jsonData.itemBox) {
                var itemBox = jsonData.itemBox[key4];
                
                itemHtml += "  <div class='diagram-item-box'>\n";
                itemHtml += "    <div class='diagram-item-tit-area'>\n";
                itemHtml += "      <div class='diagram-item-tit' data-itembox-key='" + (itemBox.itemBoxKey != undefined ? itemBox.itemBoxKey : "") + "'";
                
                for (var key5 in itemBox.itemBoxAttr) {
                    itemHtml += " " + key5 + "='" + itemBox.itemBoxAttr[key5].replace(/'/gi,'&#39;') + "'";
                }
                
                for (var key6 in itemBox.itemBoxEvent) {
                    itemHtml += " " + key6 + "='" + itemBox.itemBoxEvent[key6].replace(/'/gi,'&#39;') + "'";
                }
                
                itemHtml += ">" + (itemBox.itemBoxName != undefined ? itemBox.itemBoxName : "") + "</div>\n";
                itemHtml += "      <div class='diagram-item-tit-btn'>\n";
                itemHtml += "        <button type='button' class='diagram-show-btn' onclick='showDiagram(this);'>\n";
                itemHtml += "          <span><img src='img/icon-hide.png' alt='계통도내용보이기'></span>\n";
                itemHtml += "        </button>\n";
                itemHtml += "      </div>\n";
                itemHtml += "    </div>\n";
                itemHtml += "    <div class='diagram-item-con-area'>\n";
                
                if (itemBox.itemBoxData != undefined) {
                    if (itemBox.itemBoxData.length > 0) {
                        itemHtml += "      <table class='diagram-table'>\n";
                        itemHtml += "        <colgroup>\n";
                        itemHtml += "          <col width='*'>\n";
                        itemHtml += "          <col width='*'>\n";
                        itemHtml += "        </colgroup>\n";
                        itemHtml += "        <tbody>\n";
                        
                        for (var key7 in itemBox.itemBoxData) {
                            var itemBoxData = itemBox.itemBoxData[key7];
                            
                            itemHtml += "          <tr>\n";
                            itemHtml += "            <th>" + (itemBoxData.itemDataName != undefined ? itemBoxData.itemDataName : "") + "</th>\n";
                            itemHtml += "            <td data-itemdata-key='" + (itemBoxData.itemDataKey != undefined ? itemBoxData.itemDataKey : "") + "'";
                            
                            for (var key8 in itemBoxData.itemDataAttr) {
                                itemHtml += " " + key8 + "='" + itemBoxData.itemDataAttr[key8].replace(/'/gi,'&#39;') + "'";
                            }

                            for (var key9 in itemBoxData.itemDataEvent) {
                                itemHtml += " " + key9 + "='" + itemBoxData.itemDataEvent[key9].replace(/'/gi,'&#39;') + "'";
                            }
                            
                            itemHtml += ">\n";
                            
                            if (itemBoxData.itemDataValue != undefined) {
                                itemHtml += "              <span class='diagram-data-value'>" + itemBoxData.itemDataValue + "</span>\n";
                            }
                            
                            if (itemBoxData.itemDataUnit != undefined) {
                                itemHtml += "              <span class='diagram-data-unit'>" + itemBoxData.itemDataUnit + "</span>\n";
                            }
                            
                            itemHtml += "            </td>\n";
                            itemHtml += "          </tr>\n";
                        }
                        
                        itemHtml += "        </tbody>\n";
                        itemHtml += "      </table>\n";
                    }
                }
                
                itemHtml += "    </div>\n";
                itemHtml += "  </div>\n";
            }
            
            itemHtml += "</div>\n";
            
            $li.append(itemHtml);
            
            //key가 있고 자식 jsonData가 있을 경우 설정
            if (itemKey != "" && _reData[itemKey] != undefined) {
                var $innerUl = $("<ul class='diagram-list'></ul>");
                
                createDiagram(_reData[itemKey],$innerUl);
                
                $li.append($innerUl);
            }
            
            $parentObj.append($li);
        }
        
        //diagram 방향 설정
        if (_direction == "horizontal") {
            $this.addClass("horizontal-diagram-area");
        } else {
            $this.addClass("vertical-diagram-area");
        }
        
        //parentKey 기준으로 자식 jsonData 묶기
        for (var key in _data) {
            var parentKey = (_data[key].parentKey != undefined ? _data[key].parentKey : "");
            
            if (_reData[parentKey] == undefined) {
                _reData[parentKey] = [];
            }
            
            _reData[parentKey].push(_data[key]);
        }
        
        //최상위 jsonData부터 설정
        for (var key2 in _reData[""]) {
            createDiagram(_reData[""],$ul);
        }
        
        $this.append($ul);
    }
});

/* 옵션 설명

direction: 'vertical/horizontal (기본값 : vertical)',
data: [
    {
        //diagram-item클래스에 추가
        parentKey : '부모키 (키가 없으면 최상위)',
        itemKey : '항목키 (키가 없으면 수정불가)',
        itemBox : [
            {
                //diagram-item-tit클래스에 추가
                itemBoxKey : '항목키(서브) (키가 없으면 수정불가)',
                itemBoxName : '항목명(서브)',
                itemBoxAttr : {
                    id : '항목아이디(서브)',
                    class : '항목클래스(서브)',
                    name : '항목네임(서브)',
                    ...
                },
                itemBoxEvent : {
                    onclick : '항목클릭이벤트(서브)',
                    ...
                },
                itemBoxData : [
                    {
                        //diagram-table테이블의 td에 추가
                        itemDataKey : '항목키(데이터) (키가 없으면 수정불가)',
                        itemDataName : '항목명(데이터)',
                        itemDataValue : '항목값(데이터)',
                        itemDataUnit : '항목단위(데이터)',
                        itemDataAttr : {
                            id : '항목아이디(데이터)',
                            class : '항목클래스(데이터)',
                            name : '항목네임(데이터)',
                            ...
                        },
                        itemDataEvent : {
                            onclick : '항목클릭이벤트(데이터)',
                            ...
                        }
                    },{
                        //diagram-table테이블의 td에 추가
                        itemDataKey : '항목키(데이터) (키가 없으면 수정불가)',
                        itemDataName : '항목명(데이터)',
                        itemDataValue : '항목값(데이터)',
                        itemDataUnit : '항목단위(데이터)',
                        itemDataAttr : {
                            id : '항목아이디(데이터)',
                            class : '항목클래스(데이터)',
                            name : '항목네임(데이터)',
                            ...
                        },
                        itemDataEvent : {
                            onclick : '항목클릭이벤트(데이터)',
                            ...
                        }
                    }
                ]
            },
            {
                //diagram-item-tit클래스에 추가
                itemBoxKey : '항목키(서브) (키가 없으면 수정불가)',
                itemBoxName : '항목명(서브)',
                itemBoxAttr : {
                    id : '항목아이디(서브)',
                    class : '항목클래스(서브)',
                    name : '항목네임(서브)',
                    ...
                },
                itemBoxEvent : {
                    onclick : '항목클릭이벤트(서브)',
                    ...
                },
                itemBoxData : [
                    {
                        //diagram-table테이블의 td에 추가
                        itemDataKey : '항목키(데이터) (키가 없으면 수정불가)',
                        itemDataName : '항목명(데이터)',
                        itemDataValue : '항목값(데이터)',
                        itemDataUnit : '항목단위(데이터)',
                        itemDataAttr : {
                            id : '항목아이디(데이터)',
                            class : '항목클래스(데이터)',
                            name : '항목네임(데이터)',
                            ...
                        },
                        itemDataEvent : {
                            onclick : '항목클릭이벤트(데이터)',
                            ...
                        }
                    },{
                        //diagram-table테이블의 td에 추가
                        itemDataKey : '항목키(데이터) (키가 없으면 수정불가)',
                        itemDataName : '항목명(데이터)',
                        itemDataValue : '항목값(데이터)',
                        itemDataUnit : '항목단위(데이터)',
                        itemDataAttr : {
                            id : '항목아이디(데이터)',
                            class : '항목클래스(데이터)',
                            name : '항목네임(데이터)',
                            ...
                        },
                        itemDataEvent : {
                            onclick : '항목클릭이벤트(데이터)',
                            ...
                        }
                    }
                ]
            }
        ]
    },
    {
        //diagram-item클래스에 추가
        parentKey : '부모키 (키가 없으면 최상위)',
        itemKey : '항목키 (키가 없으면 수정불가)',
        itemBox : [
            {
                //diagram-item-tit클래스에 추가
                itemBoxKey : '항목키(서브) (키가 없으면 수정불가)',
                itemBoxName : '항목명(서브)',
                itemBoxAttr : {
                    id : '항목아이디(서브)',
                    class : '항목클래스(서브)',
                    name : '항목네임(서브)',
                    ...
                },
                itemBoxEvent : {
                    onclick : '항목클릭이벤트(서브)',
                    ...
                },
                itemBoxData : [
                    {
                        //diagram-table테이블의 td에 추가
                        itemDataKey : '항목키(데이터) (키가 없으면 수정불가)',
                        itemDataName : '항목명(데이터)',
                        itemDataValue : '항목값(데이터)',
                        itemDataUnit : '항목단위(데이터)',
                        itemDataAttr : {
                            id : '항목아이디(데이터)',
                            class : '항목클래스(데이터)',
                            name : '항목네임(데이터)',
                            ...
                        },
                        itemDataEvent : {
                            onclick : '항목클릭이벤트(데이터)',
                            ...
                        }
                    },{
                        //diagram-table테이블의 td에 추가
                        itemDataKey : '항목키(데이터) (키가 없으면 수정불가)',
                        itemDataName : '항목명(데이터)',
                        itemDataValue : '항목값(데이터)',
                        itemDataUnit : '항목단위(데이터)',
                        itemDataAttr : {
                            id : '항목아이디(데이터)',
                            class : '항목클래스(데이터)',
                            name : '항목네임(데이터)',
                            ...
                        },
                        itemDataEvent : {
                            onclick : '항목클릭이벤트(데이터)',
                            ...
                        }
                    }
                ]
            }
        ]
    },
    {
        //diagram-item클래스에 추가
        parentKey : '부모키 (키가 없으면 최상위)',
        itemKey : '항목키 (키가 없으면 수정불가)',
        itemBox : [
            {
                //diagram-item-tit클래스에 추가
                itemBoxKey : '항목키(서브) (키가 없으면 수정불가)',
                itemBoxName : '항목명(서브)',
                itemBoxData : [
                    {
                        //diagram-table테이블의 td에 추가
                        itemDataKey : '항목키(데이터) (키가 없으면 수정불가)',
                        itemDataName : '항목명(데이터)',
                        itemDataValue : '항목값(데이터)',
                        itemDataUnit : '항목단위(데이터)'
                    },{
                        //diagram-table테이블의 td에 추가
                        itemDataKey : '항목키(데이터) (키가 없으면 수정불가)',
                        itemDataName : '항목명(데이터)',
                        itemDataValue : '항목값(데이터)',
                        itemDataUnit : '항목단위(데이터)'
                    }
                ]
            }
        ]
    }
]
*/


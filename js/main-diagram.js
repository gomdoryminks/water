$(function() {    
    if ($("#disdia01Diagram").length > 0) {
        var data = [
            {
                //diagram-item클래스에 추가
                parentKey : '',
                itemKey : 'item01',
                itemBox : [
                    {
                        //diagram-item-tit클래스에 추가
                        itemBoxKey : 'item0101',
                        itemBoxName : '부평정수장 3정수',
                        itemBoxData : [
                            {
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item010101',
                                itemDataName : '원수유입유량',
                                itemDataValue : '0000.00',
                                itemDataUnit : '㎥/h',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item010102',
                                itemDataName : '탁도',
                                itemDataValue : '0.00',
                                itemDataUnit : 'NTU',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item010103',
                                itemDataName : '잔류염소',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎎/ℓ',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item010104',
                                itemDataName : 'pH',
                                itemDataValue : '0.00',
                                itemDataUnit : '',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item010105',
                                itemDataName : '송수압',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item010106',
                                itemDataName : '송수유량',
                                itemDataValue : '0000.00',
                                itemDataUnit : '㎥/h',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            }
                        ]
                    },
                    {
                        //diagram-item-tit클래스에 추가
                        itemBoxKey : 'item0102',
                        itemBoxName : '부평정수장 1정수',
                        itemBoxData : [
                            {
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item010201',
                                itemDataName : '원수유입유량',
                                itemDataValue : '0000.00',
                                itemDataUnit : '㎥/h',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item010202',
                                itemDataName : '탁도',
                                itemDataValue : '0.00',
                                itemDataUnit : 'NTU',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item010203',
                                itemDataName : '잔류염소',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎎/ℓ',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item010204',
                                itemDataName : 'pH',
                                itemDataValue : '0.00',
                                itemDataUnit : '',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item010205',
                                itemDataName : '송수압',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item010206',
                                itemDataName : '송수유량',
                                itemDataValue : '0000.00',
                                itemDataUnit : '㎥/h',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                //diagram-item클래스에 추가
                parentKey : 'item01',
                itemKey : 'item02',
                itemBox : [
                    {
                        //diagram-item-tit클래스에 추가
                        itemBoxKey : 'item0201',
                        itemBoxName : '천마산배수지',
                        itemBoxData : [
                            {
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item020101',
                                itemDataName : '유입압력',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item020102',
                                itemDataName : '유출유량',
                                itemDataValue : '0000.00',
                                itemDataUnit : '㎥/h',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item020103',
                                itemDataName : '잔류염소',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎎/ℓ',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item020104',
                                itemDataName : 'pH',
                                itemDataValue : '0.00',
                                itemDataUnit : '',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item020105',
                                itemDataName : '수온',
                                itemDataValue : '0.00',
                                itemDataUnit : '℃',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item020106',
                                itemDataName : '수위1',
                                itemDataValue : '000',
                                itemDataUnit : '㎝',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item020107',
                                itemDataName : '수위2',
                                itemDataValue : '000',
                                itemDataUnit : '㎝',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                //diagram-item클래스에 추가
                parentKey : 'item01',
                itemKey : 'item03',
                itemBox : [
                    {
                        //diagram-item-tit클래스에 추가
                        itemBoxKey : 'item0301',
                        itemBoxName : '희망천배수지',
                        itemBoxData : [
                            {
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item030101',
                                itemDataName : '유입압력',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item030102',
                                itemDataName : '유출유량',
                                itemDataValue : '0000.00',
                                itemDataUnit : '㎥/h',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item030103',
                                itemDataName : '잔류염소',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎎/ℓ',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item030104',
                                itemDataName : 'pH',
                                itemDataValue : '0.00',
                                itemDataUnit : '',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item030105',
                                itemDataName : '수온',
                                itemDataValue : '0.00',
                                itemDataUnit : '℃',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item030106',
                                itemDataName : '수위1',
                                itemDataValue : '000',
                                itemDataUnit : '㎝',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item030107',
                                itemDataName : '수위2',
                                itemDataValue : '000',
                                itemDataUnit : '㎝',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                //diagram-item클래스에 추가
                parentKey : 'item01',
                itemKey : 'item04',
                itemBox : [
                    {
                        //diagram-item-tit클래스에 추가
                        itemBoxKey : 'item0401',
                        itemBoxName : '원적산배수지',
                        itemBoxData : [
                            {
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item040101',
                                itemDataName : '유입유량1',
                                itemDataValue : '0000.00',
                                itemDataUnit : '㎥/h',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item040102',
                                itemDataName : '유입유량2',
                                itemDataValue : '0000.00',
                                itemDataUnit : '㎥/h',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item040103',
                                itemDataName : '유입압력',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item040104',
                                itemDataName : '잔류염소',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎎/ℓ',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item040105',
                                itemDataName : 'pH',
                                itemDataValue : '0.00',
                                itemDataUnit : '',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item040106',
                                itemDataName : '수온',
                                itemDataValue : '0.00',
                                itemDataUnit : '℃',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item040107',
                                itemDataName : '수위1',
                                itemDataValue : '000',
                                itemDataUnit : '㎝',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item040108',
                                itemDataName : '수위2',
                                itemDataValue : '000',
                                itemDataUnit : '㎝',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item040109',
                                itemDataName : '수위3',
                                itemDataValue : '000',
                                itemDataUnit : '㎝',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item040110',
                                itemDataName : '수위4',
                                itemDataValue : '000',
                                itemDataUnit : '㎝',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                //diagram-item클래스에 추가
                parentKey : 'item02',
                itemKey : 'item05',
                itemBox : [
                    {
                        //diagram-item-tit클래스에 추가
                        itemBoxKey : 'item0501',
                        itemBoxName : '계산1가압장',
                        itemBoxData : [
                            {
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item050101',
                                itemDataName : '흡입압력',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item050102',
                                itemDataName : '토출압력',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                //diagram-item클래스에 추가
                parentKey : 'item02',
                itemKey : 'item06',
                itemBox : [
                    {
                        //diagram-item-tit클래스에 추가
                        itemBoxKey : 'item0601',
                        itemBoxName : '병방가압장',
                        itemBoxData : [
                            {
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item060101',
                                itemDataName : '흡입압력',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item060102',
                                itemDataName : '토출압력',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                //diagram-item클래스에 추가
                parentKey : 'item02',
                itemKey : 'item07',
                itemBox : [
                    {
                        //diagram-item-tit클래스에 추가
                        itemBoxKey : 'item0701',
                        itemBoxName : '효성가압장',
                        itemBoxData : [
                            {
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item070101',
                                itemDataName : '흡입압력',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item070102',
                                itemDataName : '토출압력',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                //diagram-item클래스에 추가
                parentKey : 'item02',
                itemKey : 'item08',
                itemBox : [
                    {
                        //diagram-item-tit클래스에 추가
                        itemBoxKey : 'item0801',
                        itemBoxName : '방측가압장',
                        itemBoxData : [
                            {
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item080101',
                                itemDataName : '흡입압력',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            },{
                                //diagram-table테이블의 td에 추가
                                itemDataKey : 'item080102',
                                itemDataName : '토출압력',
                                itemDataValue : '0.00',
                                itemDataUnit : '㎏/㎠',
                                itemDataEvent : {
                                    onclick : 'openTrendLayer(this);'
                                }
                            }
                        ]
                    }
                ]
            }
        ];
        
        var disdia01Diagram = $("#disdia01Diagram").setDiagramList({
            direction: 'vertical',
            data: data
        });
    }
});


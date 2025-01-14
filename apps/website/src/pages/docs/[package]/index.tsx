import { Container } from '@/components/layout/Container';
import { useCallback, useEffect, useState } from 'react';
import { docs, libNames } from '@/lib/docs';
import { ScrollArea, Sheet, SheetContent, SheetTrigger } from '@edge-ui/react';
import { PanelRightClose } from 'lucide-react';
import { DocsItemList } from '@/components/docs/DocsItemList';
import { Combobox } from '@/components/combobox';
import { useRouter } from 'next/router';
import { ContentArea } from '@/components/docs/ContentArea';
import { VscSymbolClass, VscSymbolInterface, VscSymbolMethod } from 'react-icons/vsc';
import { ScrollTop } from '@/components/scrolltop/ScrollTop';

export default function DocsTestPage() {
    const router = useRouter();
    const currentPackageName = router.query.package as string;
    const [currentLib, setCurrentLib] = useState<ReturnType<typeof getLibraries>[number]>(docs.modules[currentPackageName]);
    const getLibraries = useCallback(() => {
        const libs = Object.values(docs.modules);
        return libs;
    }, []);

    useEffect(() => {
        if (!currentPackageName) return;
        if (!docs.modules[currentPackageName]) return void router.replace('/404');
        setCurrentLib(docs.modules[currentPackageName]);
    }, [currentPackageName]);

    if (!docs.modules[currentPackageName] || !currentLib) return;

    const selectList = (
        <Combobox
            onSelect={(val) => {
                setCurrentLib(getLibraries().find((libr) => libr.name === val)!);
            }}
            value={currentLib.name}
            options={libNames.map((l) => ({ label: l, value: l }))}
        />
    );

    return (
        <Container>
            <div className="flex flex-row items-start w-full gap-5 mt-2">
                <div className="lg:border lg:p-2 rounded-lg lg:w-[20%] mb-5 gap-5">
                    <div className="hidden lg:flex flex-col gap-5 mt-5">
                        {selectList}
                        <ScrollArea className="max-h-screen">
                            <div className="space-y-3 max-h-[84vh]">
                                {currentLib.classes.length ? (
                                    <DocsItemList
                                        name="Classes"
                                        data={currentLib.classes.map((m) => {
                                            return {
                                                lib: currentLib.name,
                                                name: m.data.name,
                                                type: 'class'
                                            };
                                        })}
                                        link={(name) => {
                                            return `/docs/${encodeURIComponent(currentLib.name)}?type=class&target=${name}`;
                                        }}
                                        icon={<VscSymbolClass className="h-5 w-5" />}
                                    />
                                ) : null}
                                {currentLib.functions.length ? (
                                    <DocsItemList
                                        name="Functions"
                                        data={currentLib.functions.map((m) => {
                                            return {
                                                lib: currentLib.name,
                                                name: m.data.name,
                                                type: 'function'
                                            };
                                        })}
                                        link={(name) => {
                                            return `/docs/${encodeURIComponent(currentLib.name)}?type=function&target=${name}`;
                                        }}
                                        icon={<VscSymbolMethod className="h-5 w-5" />}
                                    />
                                ) : null}
                                {currentLib.types.length ? (
                                    <DocsItemList
                                        name="Typedef"
                                        data={currentLib.types.map((m) => {
                                            return {
                                                lib: currentLib.name,
                                                name: m.data.name,
                                                type: 'type'
                                            };
                                        })}
                                        link={(name) => {
                                            return `/docs/${encodeURIComponent(currentLib.name)}?type=type&target=${name}`;
                                        }}
                                        icon={<VscSymbolInterface className="h-5 w-5" />}
                                    />
                                ) : null}
                            </div>
                        </ScrollArea>
                    </div>
                    <div className="lg:hidden absolute left-0 top-[4.3rem]">
                        <Sheet>
                            <SheetTrigger className="sticky">
                                <PanelRightClose className="h-8 w-8" />
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[85%]">
                                <div className="flex flex-col gap-5 mt-5">
                                    {selectList}
                                    <ScrollArea className="max-h-screen">
                                        <div className="space-y-3 max-h-[84vh]">
                                            {currentLib.classes.length ? (
                                                <DocsItemList
                                                    name="Classes"
                                                    data={currentLib.classes.map((m) => {
                                                        return {
                                                            lib: currentLib.name,
                                                            name: m.data.name,
                                                            type: 'class'
                                                        };
                                                    })}
                                                    link={(name) => {
                                                        return `/docs/${encodeURIComponent(currentLib.name)}?type=class&target=${name}`;
                                                    }}
                                                    icon={<VscSymbolClass className="h-5 w-5" />}
                                                />
                                            ) : null}
                                            {currentLib.functions.length ? (
                                                <DocsItemList
                                                    name="Functions"
                                                    data={currentLib.functions.map((m) => {
                                                        return {
                                                            lib: currentLib.name,
                                                            name: m.data.name,
                                                            type: 'function'
                                                        };
                                                    })}
                                                    link={(name) => {
                                                        return `/docs/${encodeURIComponent(currentLib.name)}?type=function&target=${name}`;
                                                    }}
                                                    icon={<VscSymbolMethod className="h-5 w-5" />}
                                                />
                                            ) : null}
                                            {currentLib.types.length ? (
                                                <DocsItemList
                                                    name="Typedef"
                                                    data={currentLib.types.map((m) => {
                                                        return {
                                                            lib: currentLib.name,
                                                            name: m.data.name,
                                                            type: 'type'
                                                        };
                                                    })}
                                                    link={(name) => {
                                                        return `/docs/${encodeURIComponent(currentLib.name)}?type=type&target=${name}`;
                                                    }}
                                                    icon={<VscSymbolInterface className="h-5 w-5" />}
                                                />
                                            ) : null}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
                <div className="flex-1 overflow-auto h-screen hidescrollbar">
                    <ContentArea data={currentLib} />
                </div>
            </div>
            <ScrollTop />
        </Container>
    );
}

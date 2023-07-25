import React, { FC } from "react";
import {
    CmsButtonDto,
    CmsContentItemTypes,
    CmsHeroSectionDto,
    CmsImageDto,
    CmsRichBodyTextDto,
    CmsSavingsSliderDto,
    CmsUserGuideBoxDto,
} from "cms/cms-content-item-types";
import { HeroSection } from "components/hero-section";
import { Button } from "components/button";
import Dimensions from "styles/dimensions";
import { useAuthContext } from "api/auth/auth-context";
import { SavingsSlider } from "components/savings-slider";
import { UserGuideBox } from "components/user-guide-box";
import { GetStartedButton } from "components/get-started-button";

/**
 * Renders CMS content, transforming the CMS data structure to appropriate react components
 */

export type CmsTransformedContentProps = {
    contentItems: (
        | CmsSavingsSliderDto
        | CmsUserGuideBoxDto
        | CmsHeroSectionDto
        | CmsRichBodyTextDto
    )[];
};

export const CmsTransformedContent: FC<CmsTransformedContentProps> = (
    props
) => {
    const authContext = useAuthContext();

    let transformedItems = [];

    for (let i = 0; i < props.contentItems.length; ++i) {
        let contentItem = props.contentItems[i];

        switch (contentItem.__component) {
            case CmsContentItemTypes.HeroSection:
                const heroSection = contentItem as CmsHeroSectionDto;
                transformedItems.push(
                    <div key={i}>
                        <HeroSection
                            headline={heroSection.headline}
                            backgroundImageUrl={
                                heroSection.backgroundImage?.url
                            }
                            showButton={true}
                            onButtonClicked={() =>
                                heroSection.showGetStartedButton &&
                                authContext.getStarted()
                            }
                            buttonText={heroSection.buttonText}
                            buttonUrl={
                                heroSection.showGetStartedButton
                                    ? undefined
                                    : heroSection.buttonUrl
                            }
                            fullWidth={heroSection.fullWidth}
                        />
                    </div>
                );
                break;

            case CmsContentItemTypes.SavingsSlider:
                const savingsSliderItem = contentItem as CmsSavingsSliderDto;
                transformedItems.push(
                    <div key={i}>
                        <SavingsSlider
                            currentValueLabel={
                                savingsSliderItem.currentValueText?.trim() ||
                                undefined
                            }
                            couldSaveLabel={
                                savingsSliderItem.couldSaveText?.trim() ||
                                undefined
                            }
                            couldSaveLabelAfter={
                                savingsSliderItem.afterSavingsText?.trim() ||
                                undefined
                            }
                        />
                    </div>
                );
                break;

            default:
                break;
        }
    }

    <>
        <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            accusantium nobis porro voluptates alias qui quibusdam aspernatur
            aliquam iusto fugit officia ab debitis ea, sapiente consectetur vero
            officiis tenetur! Exercitationem?
        </h1>
    </>;

    return <>{transformedItems}</>;
};
